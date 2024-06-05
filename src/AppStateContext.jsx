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

  function limiter(string, length) {
    if (string.length > length) {
      return string.substring(0, length) + "...";
    }
    return string;
  }

  function randomSelector(array, amount) {
    if (amount > array.length) {
      throw new Error("Amount cannot be greater than the length of the array");
    }

    // Create a copy of the array to avoid mutating the original array
    const arrayCopy = [...array];

    // Fisher-Yates Shuffle
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    // Return the first 'amount' elements of the shuffled array
    return arrayCopy.slice(0, amount);
  }

  return (
    <AppStateContext.Provider
      value={{
        islogged,
        setIsLogged,
        removeFirebasePrefix,
        message,
        setMessage,
        limiter,
        randomSelector,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
