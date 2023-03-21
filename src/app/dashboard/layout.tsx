import dynamic from "next/dynamic";
import Transition from "./Transition";

const NavDesktop = dynamic(() => import("./NavDesktop"));
const NavMobile = dynamic(() => import("./NavMobile"));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavDesktop />
      <NavMobile />
      <div className="text-neutral-100 md:ml-16">
        <Transition>{children}</Transition>
      </div>
    </>
  );
}
