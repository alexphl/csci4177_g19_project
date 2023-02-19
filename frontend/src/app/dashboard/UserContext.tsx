'use client'

import { createContext, useReducer } from "react";

// This context is going to hold information about the user in a json format
// Should be logged in : bool , userkey: hash, email : email, preferences : object

export const userContext = createContext(undefined);

export const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        user: { loggedIn: false, email: null },
      };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatchUser] = useReducer(userReducer, {
    // initial state
    user: { loggedIn: false, email: null },
  });

  return (
    <userContext.Provider value={{ ...state, dispatchUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
