import app from "./index";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// auth.languageCode = "it";

const firestore = getFirestore();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export function googleLogin() {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);

      // Save user details to Firestore
      // Check if user details exist in the Firestore collection "User"
      const userDoc = doc(db, "User", user.uid);
      const userDocSnapshot = await getDoc(userDoc);

      // If user details don't exist, create a new document
      if (!userDocSnapshot.exists()) {
        // Set user details in Firestore
        await setDoc(userDoc, {
          name: user.displayName,
          email: user.email,
          password: null,
          amount: 0,
          dob: null,
          city: null,
          address: null,
          gender: null,
          country: null,
          email_notify: false,
          phone_notify: false,
          task: false,
          billing: false,
          updates: false,
          b_sport: 0,
          b_casino: 0,
          active: true,
          created_at: Timestamp.now(),
          updated_at: Timestamp.now(),
        });
      }

      //redirect
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      return {
        status: 400,
        message: errorMessage,
      };
    });
}
export function twitterLogin() {}

export function facebookLogin() {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);

      //redirect
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      return {
        status: 400,
        message: errorMessage,
      };
    });
}

export async function emailLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Check if user's email is verified
    if (user.emailVerified) {
      // User is authenticated and email is verified
      localStorage.setItem("user", JSON.stringify(user));
      return { status: 200, message: "Welcome " + user.displayName, user };
    } else {
      // User's email is not verified
      return {
        status: 401,
        message: "Email not verified. Please verify your email.",
      };
    }
  } catch (error) {
    const errorMessage = error.message;
    return { status: 400, message: errorMessage };
  }
}

export async function createAccount(name, email, password) {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update user profile with the name
    await updateProfile(user, {
      displayName: name,
    });

    // Send email verification
    await sendEmailVerification(user);

    return {
      status: 200,
      message: "Welcome " + name + "! Verification email sent.",
    };
  } catch (error) {
    const errorMessage = error.message || "Unknown error occurred";
    return { status: 500, message: errorMessage };
  }
}

export function check() {
  return new Promise((resolve, reject) => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // User is signed in
          const uid = user.uid;
          const collections = [
            "User",
            "Account",
            "Bet",
            "Deposit",
            "Detail",
            "Ticket",
            "Withdraw",
          ];

          try {
            const userDataPromises = collections.map(async (collectionName) => {
              const collectionRef = collection(firestore, collectionName);
              const querySnapshot = await getDocs(
                query(
                  collectionRef,
                  where(firebase.firestore.FieldPath.documentId(), "==", uid)
                )
              );
              const collectionData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              // Create a real-time listener for the collection
              const unsubscribeCollectionListener = onSnapshot(
                query(
                  collectionRef,
                  where(firebase.firestore.FieldPath.documentId(), "==", uid)
                ),
                (snapshot) => {
                  const updatedCollectionData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  resolve({
                    status: 200,
                    message: `User is signed in: ${uid}`,
                    user,
                    userData: {
                      ...userData,
                      [collectionName]: updatedCollectionData,
                    },
                  });
                },
                (error) => {
                  // Handle error if the listener encounters an error
                  console.error("Error with collection listener:", error);
                  reject({
                    status: 400,
                    message: "Error with collection listener:" + error,
                  });
                }
              );

              // No need to store unsubscribe function explicitly

              return { [collectionName]: collectionData };
            });

            const userDataResults = await Promise.all(userDataPromises);
            const userData = Object.assign({}, ...userDataResults);

            resolve({
              status: 200,
              message: `User is signed in: ${uid}`,
              user,
              userData,
            });
          } catch (error) {
            reject({
              status: 400,
              message: "Error getting user data:" + error,
            });
          }
        } else {
          // User is signed out
          resolve({ status: 201, message: "User is signed out" });
        }
      },
      (error) => {
        // Error occurred
        reject({ status: 400, message: "Error getting user:" + error });
      }
    );

    // Return a cleanup function to unsubscribe from the authentication listener
    return () => {
      unsubscribeAuth();
    };
  });
}

export async function logout() {
  try {
    // Sign out the user from Firebase
    await auth.signOut();

    // Clear local storage
    localStorage.clear();

    // Redirect to '/'
    window.location.href = "/";
  } catch (error) {
    alert("Error logging out:", error);
  }
}

export async function resetPassword(email) {
  try {
    // Send a password reset email to the user's email address
    await sendPasswordResetEmail(auth, email);

    // Return success or some indication of the process
    return { status: true, message: "Reset mail sent Succufully " };
  } catch (error) {
    throw error; // Rethrow the error to handle it at the caller level.
  }
}
