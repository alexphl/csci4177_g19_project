"use client";

import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

const variants = {
  hidden: { opacity: 0, transform: "translateY(25px)" },
  enter: { opacity: 1, transform: "translateY(0px)" },
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
        damping: 30,
        stiffness: 500,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrap;
