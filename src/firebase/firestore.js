import { getAuth } from "firebase/auth";
import app from "./index";
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  collection,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// auth.languageCode = "it";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage();

export const getCollection = async (col = "users") => {
  try {
    const q = query(collection(db, col), orderBy("updated_at", "desc"));
    const querySnapshot = await getDocs(q);
    const collectionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { status: 200, data: collectionData };
  } catch (error) {
    console.error("Error fetching collection: ", error);
    return { status: 400, data: error.message };
  }
};
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

    return { status: 200, message: "Document updated successfully." };
  } catch (error) {
    return { status: 400, message: error.message };
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

    return { status: 200, message: "Item deleted successfully." };
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

export async function getUserData(collectionName, user = auth.currentUser.uid) {
  try {
    if (!user) {
      return { status: 400, message: "No user found. Please log in." };
    }
    const docRef = doc(db, collectionName, user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { status: 200, data: docSnap.data() };
    } else {
      return { status: 400, message: "No such document!" };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
}

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

    return { status: 200, message: "Document array updated successfully." };
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

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

export async function addImageWithPath(imageFile, path = "image") {
  try {
    // Create a reference to the storage location with a child path
    const storageRef = ref(storage, `${path}/` + imageFile.name);

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
