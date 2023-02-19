import { memo } from "react";
import Link from "next/link";
import { UserIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

const NavDesktop = () => {
	return (
		<>
			<nav className="group z-50 font-medium hidden h-screen w-24 min-w-0 max-w-fit p-4 flex-col gap-3 border-r border-neutral-800 bg-black/[0.5] lg:p-5 2xl:p-6 text-neutral-400 shadow-2xl saturate-200 backdrop-blur-lg transition-all hover:max-w-sm hover:w-60 hover:text-neutral-200 sm:fixed sm:flex text-sm">
				<button className="mb-12 flex w-fit aspect-square flex-none items-center rounded-full border-2 border-neutral-800 p-2 mx-auto group-hover:mx-0">
					<UserIcon className="h-5 w-5 text-neutral-600" />
				</button>

				<Link href="/dashboard">
					<div className="flex items-center gap-5 rounded-md p-2 hover:bg-neutral-200/[0.15]">
						<RectangleGroupIcon className="w-6 shrink-0"/>
						<p className="hidden group-hover:inline-block">
							Dashboard
						</p>
					</div>

				</Link>

				<section className="flex flex-col gap-3">
				<hr className="my-1 w-full rounded-full border border-neutral-800" />
					{contentBrowse.map((link) => (
						<Link key={link.link} href={link.link}>
							<div className="flex items-center gap-5 rounded-md p-2 hover:bg-orange-200/[0.15] hover:text-orange-200">
								<div className="w-6 shrink-0">{link.icon}</div>
								<p className="hidden group-hover:inline-block">
									{link.heading}
								</p>
							</div>
						</Link>
					))}
					<hr className="my-1 w-full rounded-full border border-neutral-800" />
				</section>

				<section className="flex flex-col gap-3">
					{contentExplore.map((link) => (
						<Link key={link.link} href={link.link}>
							<div className="flex items-center gap-5 rounded-md p-2 hover:bg-sky-200/[0.15] hover:text-sky-200">
								<div className="w-6 shrink-0">{link.icon}</div>
								<p className="hidden group-hover:inline-block">
									{link.heading}
								</p>
							</div>
						</Link>
					))}
					<hr className="my-1 w-full rounded-full border border-neutral-800" />
				</section>

				<section className="flex flex-col gap-3">
					{contentSettings.map((link) => (
						<Link key={link.link} href={link.link}>
							<div className="flex items-center gap-5 rounded-md p-2 hover:bg-violet-200/[0.15] hover:text-violet-200">
								<div className="w-6 shrink-0">{link.icon}</div>
								<p className="hidden group-hover:inline-block">
									{link.heading}
								</p>
							</div>
						</Link>
					))}
				</section>
			</nav>
		</>
	);
};

export default memo(NavDesktop);
