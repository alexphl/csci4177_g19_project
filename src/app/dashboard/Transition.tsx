"use client";

import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

const variants = {
  hidden: { opacity: 0, y: 25 },
  enter: { opacity: 1, y: 0 },
};

const TransitionWrap = ({ children }: { children: React.ReactNode }) => {
  const page = useSelectedLayoutSegment();

  return (
    <motion.div
      className="flex justify-center"
      key={page}
      style={{ opacity: 0, transform: "translateY(1.5rem)" }} // Set the initial state to variants.hidden
      animate={{ opacity: 1, transform: "translateY(0rem)" }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 500,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrap;
