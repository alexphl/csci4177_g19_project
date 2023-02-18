import { memo } from "react";

const NavDesktop = () => {
	return (
		<>
			<div className="z-50 hidden h-screen w-20 border-r duration-200 border-neutral-800 bg-black/[0.5] backdrop-blur-lg saturate-200 shadow-2xl transition-all hover:w-60 sm:fixed sm:flex"></div>
		</>
	);
};

export default memo(NavDesktop);
