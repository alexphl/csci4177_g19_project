import dynamic from "next/dynamic";

const NavDesktop = dynamic(() => import("./NavDesktop"));

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavDesktop />
      <div className="flex justify-center text-neutral-100 md:ml-16">
        {children}
      </div>
    </>
  );
}
