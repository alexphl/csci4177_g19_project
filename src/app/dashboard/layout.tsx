import dynamic from "next/dynamic";
import Transition from "./Transition";
import type { Metadata } from "next";

const UIWrap = dynamic(() => import("./UIWrap"));

export const metadata: Metadata = {
  title: "Dashboard - StockVision",
  description: "Your personal dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UIWrap />
      <div className="text-neutral-100 md:ml-16">
        <Transition>{children}</Transition>
      </div>
    </>
  );
}
