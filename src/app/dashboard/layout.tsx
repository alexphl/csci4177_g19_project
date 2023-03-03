import dynamic from "next/dynamic";
import Transition from "./Transition";

const NavDesktop = dynamic(() => import("./NavDesktop"));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavDesktop />
      <div className="flex justify-center text-neutral-100 md:ml-16">
        <Transition>{children}</Transition>
      </div>
    </>
  );
}
