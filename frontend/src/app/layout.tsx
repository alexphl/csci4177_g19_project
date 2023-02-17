import "../styles/globals.css";
import localFont from "@next/font/local";

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
    <html lang="en" className={`${font.variable} bg-neutral-900 font-sans`}>
      <body className="font-sans text-neutral-100">
        {children}

        {/*<svg className="absolute top-0 left-0 -z-10 w-full h-full opacity-10 pointer-events-none">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>

            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>*/}
      </body>
    </html>
  );
}

export default RootLayout;
