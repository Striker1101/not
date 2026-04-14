import api from "./config";

/**
 * Normalize collection names — the admin modal uses "wallet" (singular)
 * but the Express API routes use "wallets" (plural).
 */
function normalizeCollection(name) {
  const map = {
    wallet: "wallets",
    deposit: "deposits",
    withdraw: "withdraws",
    nft: "nfts",
    user: "users",
  };
  return map[name] || name;
}
/**
 * Get all documents from a collection (admin use).
 * Maps to: getCollection("users")
 */
export const getCollection = async (col = "users") => {
  try {
    col = normalizeCollection(col);
    const response = await api.get(`/${col}`);
    return { status: 200, data: response.data.data };
  } catch (error) {
    console.error("Error fetching collection: ", error);
    return { status: 400, data: error.response?.data?.message || error.message };
  }
};

/**
 * Add an item to a collection (deposits, withdraws, wallets, nfts).
 * Handles file uploads via FormData.
 * Maps to: addToCollectionArray("deposits", formData)
 */
export async function addToCollectionArray(collectionName, dataArray) {
  try {
    collectionName = normalizeCollection(collectionName);
    let hasFile = false;
    let requestData;

    // Check if there are files to upload
    if (dataArray.file && dataArray.file.length > 0) {
      hasFile = true;
      requestData = new FormData();

      // Add all non-file fields
      Object.keys(dataArray).forEach((key) => {
        if (key !== "file") {
          requestData.append(key, dataArray[key]);
        }
      });

      // Add files
      const fileList = Array.from(dataArray.file);
      fileList.forEach((file) => {
        requestData.append("file", file);
      });
    } else {
      // No files — plain JSON
      requestData = { ...dataArray };
      delete requestData.file;
    }

    const config = hasFile
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

    const response = await api.post(
      `/${collectionName}/add`,
      requestData,
      config
    );

    return { status: response.data.status, message: response.data.message };
  } catch (error) {
    return {
      status: 400,
      message: error.response?.data?.message || error.message,
    };
  }
}

/**
 * Upload a profile image.
 * Maps to: uploadProfileImage(file)
 */
export async function uploadProfileImage(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image. Please try again later.");
  }
}

/**
 * Update a document in a collection.
 * Maps to: updateDocument("users", data, documentId)
 */
export async function updateDocument(collectionName, data, documentId = null) {
  try {
    collectionName = normalizeCollection(collectionName);
    let url;
    if (collectionName === "users" && documentId) {
      // Admin updating a specific user by UID
      url = `/users/${documentId}/update`;
    } else if (collectionName === "users") {
      url = `/users/update`;
    } else {
      url = `/${collectionName}/update`;
    }

    const response = await api.put(url, data);
    return { status: 200, message: response.data.message };
  } catch (error) {
    return { status: 400, message: error.response?.data?.message || error.message };
  }
}

/**
 * Delete an item from a collection by its record ID.
 * Maps to: deleteFromCollectionArray("withdraws", index, userId)
 *
 * NOTE: In Firebase, deletion was by array index. In the Express backend,
 * we delete by the record's actual database ID. The admin frontend passes
 * the record index, so we need to resolve the actual ID.
 * For simplicity, we'll fetch the collection first and use the real ID.
 */
export async function deleteFromCollectionArray(
  collectionName,
  indexToDelete,
  userId = null
) {
  try {
    collectionName = normalizeCollection(collectionName);
    // Fetch the records to find the actual ID at this index
    const params = userId ? `?userId=${userId}` : "";
    const fetchResponse = await api.get(`/${collectionName}${params}`);
    const regions = fetchResponse.data.data?.regions || [];

    if (indexToDelete < 0 || indexToDelete >= regions.length) {
      return { status: 400, message: "Invalid index." };
    }

    const recordId = regions[indexToDelete].id;
    const response = await api.delete(`/${collectionName}/${recordId}`);
    return { status: response.data.status, message: response.data.message };
  } catch (error) {
    return { status: 400, message: error.response?.data?.message || error.message };
  }
}

/**
 * Get user data for a specific collection.
 * Maps to: getUserData("withdraws", userId)
 */
export async function getUserData(collectionName, userId = null) {
  try {
    collectionName = normalizeCollection(collectionName);
    const params = userId ? `?userId=${userId}` : "";
    const response = await api.get(`/${collectionName}${params}`);
    return { status: 200, data: response.data.data };
  } catch (error) {
    return {
      status: 500,
      message: error.response?.data?.message || error.message,
    };
  }
}

/**
 * Update an item in a collection's regions array at a specific index.
 * Maps to: updateDocumentArray("withdraws", documentId, index, data)
 *
 * In the Express backend, we update by the record's actual ID.
 */
export async function updateDocumentArray(
  collectionName,
  documentId,
  index,
  data
) {
  try {
    collectionName = normalizeCollection(collectionName);
    // documentId is the user's UID in the Firebase version.
    // We need to fetch the collection and get the real record ID at the index.
    const fetchResponse = await api.get(
      `/${collectionName}?userId=${documentId}`
    );
    const regions = fetchResponse.data.data?.regions || [];

    if (index < 0 || index >= regions.length) {
      return { status: 400, message: "Invalid index provided." };
    }

    const recordId = regions[index].id;
    const response = await api.put(`/${collectionName}/${recordId}`, data);
    return { status: 200, message: response.data.message };
  } catch (error) {
    return { status: 400, message: error.response?.data?.message || error.message };
  }
}

/**
 * Listen for updates on a collection document.
 * Maps to: getUpdatedDocument("deposits", callback)
 *
 * Firebase used onSnapshot for real-time updates.
 * This implementation uses polling (fetch every 5 seconds).
 * Returns an unsubscribe function.
 */
export function getUpdatedDocument(collectionName, onUpdate, documentId = null) {
  collectionName = normalizeCollection(collectionName);
  let active = true;

  const fetchData = async () => {
    try {
      const params = documentId ? `?userId=${documentId}` : "";
      const response = await api.get(`/${collectionName}${params}`);
      if (active && response.data.data) {
        onUpdate(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  // Initial fetch
  fetchData();

  // Poll every 5 seconds
  const intervalId = setInterval(() => {
    if (active) {
      fetchData();
    }
  }, 5000);

  // Return unsubscribe function
  return () => {
    active = false;
    clearInterval(intervalId);
  };
}

/**
 * Upload an image to storage.
 * Maps to: uploadImageToStorage(file)
 */
export async function uploadImageToStorage(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw new Error(
      "Error uploading image to storage. Please try again later."
    );
  }
}

/**
 * Upload an image with a specific path.
 * Maps to: addImageWithPath(imageFile, path)
 */
export async function addImageWithPath(imageFile, path = "image") {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.url;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw new Error(
      "Error uploading image to storage. Please try again later."
    );
  }
}
