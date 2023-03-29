/**Author: Crystal Parker B00440168 */
'use client'

import { createContext, useReducer } from "react";

// This context is going to hold information about the user in a json format
// Should be logged in : bool , userkey: hash, email : email, preferences : object

export const userContext = createContext({ isLoggedIn: false, email: undefined });

export const userReducer = (state: any, action: { type: string, payload: string }) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        user: { isLoggedIn: false, email: null },
      };
    default:
      return state;
  }
}

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatchUser] = useReducer(userReducer, {
    // initial state
    user: { isLoggedIn: false, email: undefined },
  });

  return (
    <userContext.Provider value={{ ...state, dispatchUser }}>
      {children}
    </userContext.Provider>
  );
}
