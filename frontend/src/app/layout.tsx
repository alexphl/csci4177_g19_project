import "../styles/globals.css";
import UserContextProvider from "./UserContext";
import ThemeContextProvider from "./ThemeContext";

import localFont from "next/font/local";

// If loading a variable font, you don't need to specify the font weight
const font = localFont({
  src: "../styles/Satoshi-Variable.woff2",
  variable: "--font-custom",
  display: "swap",
});

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <html lang="en" className={`${font.variable} bg-neutral-900 font-sans`}>
          <body className="font-sans text-neutral-100">{children}</body>
        </html>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default RootLayout;
