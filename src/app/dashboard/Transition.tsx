"use client";
import { Transition } from "@headlessui/react";

const TransitionWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <Transition
      appear={true}
      show={true}
      unmount={false}
      enter="transition duration-300 ease-out"
      enterFrom="transform blur-sm scale-95 opacity-50"
      enterTo="transform scale-100 opacity-100"
    >
      {children}
    </Transition>
  );
};

export default TransitionWrap;
