/**Author: Crystal Parker B00440168 */
'use client'

import { createContext, useReducer, useEffect } from "react";

// This context is going to hold information about the user in a json format
// Should be logged in : bool , userkey: hash, email : email, preferences : object

export const userContext = createContext({ isLoggedIn: false, email: undefined });

export const userReducer = (state: any, action: { type: string, payload: string }) => {
  console.log("Dispatching...", action.payload)
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
  useEffect(() => {
    const tryToGetFromSession = () =>{
        const token = JSON.parse(sessionStorage.getItem('token') || '{}');
        if (token && token.token === "testing123"){
          console.log("Loading token...")
          return JSON.stringify({name:token.name, id:token.id, email:token.email, isLoggedIn:true})
        }else{
          console.log("Couldn't find token, sorry.")
          return JSON.stringify({ isLoggedIn: false, email: undefined })
        }
     }

      dispatchUser({type:"SET_USER", payload: tryToGetFromSession() })
    
  }, [])

  const [state, dispatchUser] = useReducer(userReducer, {
    // initial state
    user: { isLoggedIn: false, email: undefined }
  });

  return (
    <userContext.Provider value={{ ...state, dispatchUser }}>
      {children}
    </userContext.Provider>
  );
}

