import dynamic from "next/dynamic";
import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";
import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";
import UserContextProvider from "../UserContext";
const Preferenes = dynamic(() => import("./preferences/page"));

function SettingsOverlay(props: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <UserContextProvider>
    <RemoveScroll>
      <FocusTrap>
        <div className="fixed z-[90] flex h-screen w-screen cursor-pointer place-content-center place-items-center">
          <div
            className="fixed h-screen w-screen bg-neutral-900/[0.6] backdrop-blur-sm backdrop-saturate-200"
            onClick={() => props.setOpen(false)}
          />

          <div className="absolute z-[51] h-screen max-h-[800px] min-h-[500px] w-screen max-w-3xl bg-black sm:rounded-2xl border border-neutral-800 cursor-default shadow-lg sm:h-5/6">
            <Preferenes />
          </div>
        </div>
      </FocusTrap>
    </RemoveScroll>
    </UserContextProvider>
  );
}

export default memo(SettingsOverlay);
