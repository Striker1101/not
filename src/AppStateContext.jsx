import React, { createContext, useState, useContext, useEffect } from "react";
import { check } from "./firebase/auth";
import { getUserData } from "./firebase/firestore";
import axios from "axios";

// Create a context
export const AppStateContext = createContext();

const monk = process.env.REACT_APP_SPORTMONK;
// Create a provider component
export const AppStateProvider = ({ children }) => {
  const [message, setMessage] = useState({
    content: null,
    type: null,
    timer: null,
  });
  const [islogged, setIsLogged] = useState({
    status: 0,
    message: "",
  });

  /**
   * @param {string} input
   * @returns string()
   */

  function removeFirebasePrefix(input) {
    if (typeof input !== "string") {
      return null;
    }

    const firebasePrefix = "Firebase:";

    if (input.startsWith(firebasePrefix)) {
      return input.slice(firebasePrefix.length); // Remove the prefix
    } else {
      return input; // Return the input as is if it doesn't contain the Firebase prefix
    }
  }

  useEffect(() => {
    async function checkUser() {
      try {
        const result = await check();
        setIsLogged(result);
      } catch (error) {
        setIsLogged({ status: 400, message: error });
      }
    }

    checkUser();
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        islogged,
        setIsLogged,
        removeFirebasePrefix,
        message,
        setMessage,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
