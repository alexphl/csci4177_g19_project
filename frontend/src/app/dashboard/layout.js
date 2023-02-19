"use client";

import dynamic from "next/dynamic";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useReducer } from "react";

const NavDesktop = dynamic(() => import("./NavDesktop"));

const themeMUI = createTheme({
  palette: {
    mode: "dark",
  },
});

const userReducer = (state, action) => {
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

const userContext = createContext();

export default function Home({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  const [userState, dispatchUser] = useReducer(userReducer, {
    // initial state
    user: { loggedIn: false, email: null },
  });

  return (
    <>
      <ThemeProvider theme={themeMUI}>
        <userContext.Provider value={{ ...userState, dispatchUser }}>
          <NavDesktop />
          <div className="text-neutral-100 md:ml-16 flex justify-center">{children}</div>
        </userContext.Provider>
      </ThemeProvider>
    </>
  );
}
