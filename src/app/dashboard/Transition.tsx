"use client";

import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import UserContextProvider from "../UserContext";

export default function TransitionWrap({ children }: { children: React.ReactNode }) {
  const page = useSelectedLayoutSegment();

  return (
    <UserContextProvider>
    <motion.div
      className="flex justify-center"
      key={page}
      style={{ opacity: 0, transform: "translateY(1.5rem)" }}
      animate={{ opacity: 1, transform: "translateY(0rem)" }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 500,
      }}
    >
      {children}
    </motion.div>
    </UserContextProvider>
  );
}
