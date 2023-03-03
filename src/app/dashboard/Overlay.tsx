import FocusTrap from "focus-trap-react";
import { RemoveScroll } from "react-remove-scroll";
import { memo, createContext } from "react";

export const overlayContext = createContext({ isOpen: false });

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <RemoveScroll>
      <FocusTrap>
        <div className="fixed z-50 flex h-screen w-screen cursor-pointer place-content-center place-items-center">
          <div
            className="fixed h-screen w-screen bg-stone-700/[0.3] backdrop-blur-sm"
            onClick={() => false}
          />

          <div className="absolute z-[51] h-screen max-h-[800px] min-h-[500px] w-screen max-w-3xl cursor-default shadow-lg sm:h-5/6">
            {children}
          </div>
        </div>
      </FocusTrap>
    </RemoveScroll>
  );
};

export default memo(Overlay);
