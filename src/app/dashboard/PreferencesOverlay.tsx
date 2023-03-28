import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";
import { m } from "framer-motion";
import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";
import Preferences from "./preferences/page";

function SettingsOverlay(props: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <RemoveScroll>
      <FocusTrap>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-[60] flex h-screen w-screen place-content-center place-items-center"
        >
          <div
            className="fixed h-screen w-screen bg-neutral-900/[0.6] backdrop-blur-sm backdrop-saturate-200"
            onClick={() => props.setOpen(false)}
          />

          <m.div
            initial={{ opacity: 0, transform: "translateY(3rem)" }}
            animate={{ opacity: 1, transform: "translateY(0rem)" }}
            exit={{ opacity: 0, transform: "translateY(3rem)" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 500,
            }}
            className="absolute z-[51] h-[75%] max-h-[800px] min-h-[500px] w-[95%] max-w-xl bg-black rounded-2xl border border-neutral-800 cursor-default shadow-lg sm:h-5/6"
          >
            <Preferences />
          </m.div>
        </m.div>
      </FocusTrap>
    </RemoveScroll>
  );
}

export default memo(SettingsOverlay);
