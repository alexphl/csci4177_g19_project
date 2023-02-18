import SettingsPane from "./SettingsPane";
import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";
import { memo } from "react";

const OverlayComponent = (props: { controller: any }) => {
  const [isOpen, setIsOpen] = props.controller;

  return (
    <>
      {isOpen && (
        <RemoveScroll>
          <FocusTrap>
            <div className="fixed z-50 flex h-screen w-screen cursor-pointer place-content-center place-items-center">
              <div
                className="fixed h-screen w-screen bg-stone-700/[0.3] backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute z-[51] h-screen max-h-[800px] min-h-[500px] w-screen max-w-3xl cursor-default shadow-lg sm:h-5/6">
                <SettingsPane />
              </div>
            </div>
          </FocusTrap>
        </RemoveScroll>
      )}
    </>
  );
};

export default memo(OverlayComponent);
