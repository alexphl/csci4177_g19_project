import { memo } from "react";
import Link from "next/link";
import { UserIcon, HomeIcon } from "@heroicons/react/24/solid";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

const NavDesktop = () => {
	return (
		<>
			<nav className="group z-50 hidden h-screen w-20 flex-col gap-3 border-r border-neutral-800 bg-black/[0.5] p-5 text-neutral-400 shadow-2xl saturate-200 backdrop-blur-lg transition-all duration-200 hover:w-60 hover:text-neutral-200 sm:fixed sm:flex">
				<button className="mb-12 flex w-fit aspect-square flex-none items-center rounded-full border border-neutral-800 p-2">
					<UserIcon className="h-5 w-5 text-neutral-600" />
				</button>

				<Link href="/dashboard">
					<div className="flex gap-4 rounded-md p-2 hover:bg-neutral-200/[0.2]">
						<HomeIcon className="w-6 shrink-0"/>
						<p className="hidden group-hover:inline-block">
							Dashboard
						</p>
					</div>

				</Link>

				<section className="flex flex-col gap-3">
				<hr className="my-1 w-full rounded-full border border-neutral-800" />
					{contentBrowse.map((link) => (
						<Link key={link.link} href={link.link}>
							<div className="flex gap-4 rounded-md p-2 hover:bg-orange-200/[0.2] hover:text-orange-200">
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
							<div className="flex gap-4 rounded-md p-2 hover:bg-sky-200/[0.2] hover:text-sky-200">
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
							<div className="flex gap-4 rounded-md p-2 hover:bg-violet-200/[0.2] hover:text-violet-200">
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
