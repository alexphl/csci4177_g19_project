/**Author: Crystal Parker B00440168 */
'use client'

import { createContext, useReducer } from "react";
import useSessionStorage from "./useSessionStorage";

// This context is going to hold information about the user in a json format
// Should be logged in : bool , userkey: hash, email : email, preferences : object

export const userContext = createContext({ name: undefined, id: undefined, email: undefined, isLoggedIn: false });

export const userReducer = (state: any, action: { type: string, payload: any }) => {
  console.log("Dispatching...", action.payload)
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        user: { name: undefined, id: undefined, email: undefined, isLoggedIn: false }
      };
    default:
      return state;
  }
}

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const token = useSessionStorage('token');

  const [state, dispatchUser] = useReducer(userReducer, {
    // initial state
    user: token ? token.user : { name: undefined, id: undefined, email: undefined, isLoggedIn: false }
  });

  if (!state.user.isLoggedIn) {
    let payload = null;

    if (token) {
      payload = JSON.parse(token);
      payload['isLoggedIn'] = true;
      dispatchUser({ type: "SET_USER", payload: payload })
    }
  }

  return (
    <userContext.Provider value={{ ...state, dispatchUser }}>
      {children}
    </userContext.Provider>
  );
}
