import { getAuth } from "firebase/auth";
import app from "./index";
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  collection,
  where,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// auth.languageCode = "it";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage();

export async function addToCollectionArray(collectionName, dataArray) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user found. Please log in.");
    }

    const docRef = doc(db, collectionName, user.uid);

    // Initialize the data object
    const data = {
      ...dataArray,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    // Check if the dataArray includes a file field
    if (dataArray.file && dataArray.file.length > 0) {
      const fileListArray = Array.from(dataArray.file); // Convert FileList to Array
      const fileUrls = await Promise.all(
        fileListArray.map((file) => uploadImageToStorage(file))
      );
      data.fileUrls = fileUrls; // Store the URLs in the data object
      delete data.file; // Remove the file field to avoid storing the raw files in Firestore
    }

    // Check if the user document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // User document doesn't exist, create it
      await setDoc(docRef, { regions: [] }); // Create document with empty regions array
    }

    // Update the array field in the user document
    await updateDoc(docRef, {
      regions: arrayUnion(data), // Spread dataArray if it's an array
    });

    return { status: 200, message: "Operation was  successfully." };
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

export async function uploadProfileImage(file) {
  try {
    const userId = auth.currentUser.uid;

    // Create a reference to the storage location
    const storageRef = ref(storage, file.name);

    // Upload the file to the storage location
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Update the user's photoURL in Firestore
    const UserRef = doc(db, "User", userId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(UserRef, {
      photoURL: downloadURL,
    });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image. Please try again later.");
  }
}

export async function updateDocument(
  collectionName,
  data,
  documentId = auth.currentUser.uid
) {
  try {
    const docRef = doc(db, collectionName, documentId);

    // Add updated_at timestamp to the data
    const updatedData = {
      ...data,
      updated_at: Timestamp.now(),
    };

    // Check if the document exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Update the document with the updated data
      await updateDoc(docRef, updatedData);
    } else {
      // Create the document with the updated data
      await setDoc(docRef, updatedData);
    }

    return { success: 200, message: "Document updated successfully." };
  } catch (error) {
    return { success: 400, message: error.message };
  }
}

export async function deleteFromCollectionArray(collectionName, indexToDelete) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user found. Please log in.");
    }

    const docRef = doc(db, collectionName, user.uid);

    // Fetch the document
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("User document not found.");
    }

    const data = docSnap.data();

    // Get the array to update
    const regions = data.regions || [];

    // Check if the index is valid
    if (indexToDelete < 0 || indexToDelete >= regions.length) {
      throw new Error("Invalid index.");
    }

    // Remove the item from the array
    regions.splice(indexToDelete, 1);

    // Update the document with the modified array
    await updateDoc(docRef, {
      regions: regions,
    });

    return { success: true, message: "Item deleted successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getAllDocumentsInCollection(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    for (const docRef of querySnapshot.docs) {
      const userData = docRef.data(); // Get the data of the document
      const userId = docRef.id; // Get the document ID (user ID)

      // Get additional user details based on the user ID (document ID)
      const userDoc = await getDoc(doc(db, "User", userId)); // Assuming 'users' is the collection storing user details
      const userDetails = userDoc.data(); // Get the user details

      // Merge user details into the document data
      const mergedData = { id: userId, ...userData, ...userDetails };
      documents.push(mergedData);
    }
    return documents;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

export async function getUserData(collectionName) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { status: "error", message: "No user found. Please log in." };
    }

    const docRef = doc(db, collectionName, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { status: true, data: docSnap.data() };
    } else {
      return { status: false, message: "No such document!" };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error fetching user data. Please try again later.",
    };
  }
}

export const updateUserData = async (userId, newData) => {
  try {
    // Get a reference to the user document
    const userRef = doc(db, "User", userId);

    // Update the user document with the new data
    await updateDoc(userRef, {
      ...newData,
    });

    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export async function updateDocumentArray(
  collectionName,
  documentId,
  index,
  data
) {
  try {
    // Reference to the document
    const docRef = doc(db, collectionName, documentId);

    // Get the document snapshot
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Document not found.");
    }

    // Get the current regions array from the document
    const regions = docSnap.data().regions;

    // Check if the provided index is valid
    if (index < 0 || index >= regions.length) {
      throw new Error("Invalid index provided.");
    }

    // Update the region at the specified index with the provided data
    regions[index] = { ...regions[index], ...data };

    // Update the document with the updated regions array
    await updateDoc(docRef, { regions });

    return { success: true, message: "Document array updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const getMethodCollection = async () => {
  try {
    const methodCollectionRef = collection(db, "Method"); // Reference to the Method collection
    const querySnapshot = await getDocs(methodCollectionRef); // Fetch the documents in the collection

    const methods = []; // Array to store the method documents
    querySnapshot.forEach((doc) => {
      methods.push({ id: doc.id, ...doc.data() }); // Extract data from each document and add it to the array
    });

    return methods; // Return the array of method documents
  } catch (error) {
    console.error("Error fetching Method collection:", error);
    throw error;
  }
};

export const updateMethodDocument = async (methodId, methodData) => {
  try {
    const methodRef = doc(db, "Method", methodId);
    // Update the document with the new data
    await setDoc(methodRef, { ...methodData }, { merge: true });
    console.log("Method document updated successfully");
  } catch (error) {
    throw new Error("Error updating method document: " + error.message);
  }
};

export async function uploadImageToStorage(file) {
  try {
    // Create a reference to the storage location
    const storageRef = ref(storage, file.name);

    // Upload the file to the storage location
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw new Error(
      "Error uploading image to storage. Please try again later."
    );
  }
}

export async function updateCryptoArray(index, data) {
  try {
    // Reference to the document
    const docRef = doc(db, "Method", "crypto");

    // Get the document snapshot
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Document not found.");
    }

    // Get the current regions array from the document
    const lists = docSnap.data().lists;

    // Check if the provided index is valid
    if (index < 0 || index >= lists.length) {
      throw new Error("Invalid index provided.");
    }

    // Update the region at the specified index with the provided data
    lists[index] = { ...lists[index], ...data };

    // Update the document with the updated regions array
    await updateDoc(docRef, { lists });

    return { success: true, message: "Document array updated successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function addCrypto(dataArray) {
  try {
    const docRef = doc(db, "Method", "crypto");

    const data = {
      ...dataArray,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    // Check if the user document exists
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // User document doesn't exist, create it
      await setDoc(docRef, { lists: [] }); // Create document with empty regions array
    }

    // Retry fetching the document after creation
    const updatedDocSnap = await getDoc(docRef);

    // Update the array field in the user document
    await updateDoc(docRef, {
      lists: arrayUnion(data), // Spread dataArray if it's an array
    });

    return { success: true, message: "Crypto added successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function cryptoimageupload(imageFile) {
  try {
    // Create a reference to the storage location with a child path
    const storageRef = ref(storage, "images/" + imageFile.name);

    // Upload the file to the storage location
    await uploadBytes(storageRef, imageFile);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw new Error(
      "Error uploading image to storage. Please try again later."
    );
  }
}

export async function deleteFromCrypto(indexToDelete) {
  try {
    const docRef = doc(db, "Method", "crypto");

    // Fetch the document
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("User document not found.");
    }

    const data = docSnap.data();

    // Get the array to update
    const lists = data.lists || [];

    // Check if the index is valid
    if (indexToDelete < 0 || indexToDelete >= lists.length) {
      throw new Error("Invalid index.");
    }

    // Remove the item from the array
    lists.splice(indexToDelete, 1);

    // Update the document with the modified array
    await updateDoc(docRef, {
      regions: lists,
    });

    return { success: true, message: "Crypto deleted successfully." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const addDeposit = async (formData) => {
  try {
    // Check if formData has an image
    if (!formData.img) {
      throw new Error("Image is required for deposit.");
    }

    // Upload image to storage
    const imageUrl = await cryptoimageupload(formData.img);
    formData.img = imageUrl;
    // Add deposit to Firestore
    await addToCollectionArray("Deposit", formData);

    console.log("Deposit added successfully");
  } catch (error) {
    throw new Error("Error adding deposit: " + error.message);
  }
};

export const fetchTransactions = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user found. Please log in.");
    }

    const depositDocRef = doc(db, "Deposit", user.uid);
    const depositDocSnap = await getDoc(depositDocRef);
    const depositTransactions = [];

    if (depositDocSnap.exists()) {
      const depositData = depositDocSnap.data();
      depositTransactions.push({ id: depositDocSnap.id, ...depositData });
    }

    const withdrawDocRef = doc(db, "Withdraw", user.uid);
    const withdrawDocSnap = await getDoc(withdrawDocRef);
    const withdrawTransactions = [];

    if (withdrawDocSnap.exists()) {
      const withdrawData = withdrawDocSnap.data();
      withdrawTransactions.push({ id: withdrawDocSnap.id, ...withdrawData });
    }

    return [...depositTransactions, ...withdrawTransactions];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Error fetching transactions. Please try again later.");
  }
};

/**
 * Function to get a user's document from a collection and watch for any updates.
 * @param {string} collectionName - The name of the collection.
 * @param {string} documentId - The ID of the document.
 * @param {function} onUpdate - Callback function to handle updates.
 * @returns {function} - Function to unsubscribe from the listener.
 */
export function getUpdatedDocument(
  collectionName,
  onUpdate,
  documentId = auth.currentUser.uid
) {
  const docRef = doc(db, collectionName, documentId);

  // Set up a listener for the document
  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        // Call the onUpdate callback with the document data
        onUpdate(docSnap.data());
      } else {
        console.log("No such document!");
      }
    },
    (error) => {
      console.error("Error fetching document: ", error);
    }
  );

  // Return the unsubscribe function to stop listening to updates
  return unsubscribe;
}
