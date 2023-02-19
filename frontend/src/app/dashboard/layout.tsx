import dynamic from "next/dynamic";
import UserContextProvider from "./UserContext";
import ThemeContextProvider from "./ThemeContext";

const NavDesktop = dynamic(() => import("./NavDesktop"));

export default function Home({ children }: { children: React.ReactNode }) {
  
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <NavDesktop />
        <div className="flex justify-center text-neutral-100 md:ml-16">
          {children}
        </div>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}
