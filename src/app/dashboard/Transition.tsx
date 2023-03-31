/**Author: Olexiy Prokhvatylo B00847680 */

"use client";

import { m } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

export default function TransitionWrap({ children }: { children: React.ReactNode }) {
  const page = useSelectedLayoutSegment();

  return (
    <m.div
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
    </m.div>
  );
}
