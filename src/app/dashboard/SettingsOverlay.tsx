import dynamic from "next/dynamic";
import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";
import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";
const SettingsPane = dynamic(() => import("./SettingsPane"));

function SettingsOverlay(props: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <RemoveScroll>
      <FocusTrap>
        <div className="fixed z-[90] flex h-screen w-screen cursor-pointer place-content-center place-items-center">
          <div
            className="fixed h-screen w-screen bg-neutral-900/[0.6] backdrop-blur-sm backdrop-saturate-200"
            onClick={() => props.setOpen(false)}
          />

          <div className="absolute z-[51] h-screen max-h-[800px] min-h-[500px] w-screen max-w-3xl cursor-default shadow-lg sm:h-5/6">
            <SettingsPane />
          </div>
        </div>
      </FocusTrap>
    </RemoveScroll>
  );
}

export default memo(SettingsOverlay);
