"use client";

import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

const variants = {
  hidden: { opacity: 0, scale:0.95 },
  enter: { opacity: 1, scale:1 },
};

const TransitionWrap = ({ children }: { children: React.ReactNode }) => {
  const page = useSelectedLayoutSegment();

  return (
    <motion.div
      className="flex justify-center"
      key={page}
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 350,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrap;
