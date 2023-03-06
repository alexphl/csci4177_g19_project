'use client'

import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { RectangleGroupIcon } from "@heroicons/react/24/solid";
import { useSelectedLayoutSegment } from "next/navigation";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

const linkStyle = "active:brightness-125 active:saturate-200";

const NavDesktop = () => {
	const segment = useSelectedLayoutSegment();

	return (
		<nav className="group z-[90] hidden h-screen w-20 min-w-fit max-w-fit flex-col gap-3 bg-black/[0.6] p-3 text-sm font-medium text-neutral-400 shadow-md saturate-200 backdrop-blur-lg transition-all hover:w-60 hover:max-w-sm hover:min-w-0 hover:text-neutral-200 md:fixed md:flex lg:p-4 2xl:p-5">
			<button className="mx-auto mb-12 flex aspect-square w-fit flex-none items-center rounded-full bg-white/[0.05] p-2 group-hover:mx-0">
				<UserIcon className="w-5" />
			</button>

			<Link href="/dashboard" className={linkStyle}>
				<div
					className={
						"flex items-center gap-5 rounded-md p-2 hover:bg-neutral-200/[0.15]" +
						(!segment ? " bg-neutral-200/[0.1] text-neutral-100" : "")
					}
				>
					<RectangleGroupIcon className="w-5 shrink-0 ml-0.5" />
					<h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
						Dashboard
					</h2>
				</div>
			</Link>

			<section className="flex flex-col gap-2">
				<hr className="my-1 w-full rounded-full border border-neutral-800" />
				{contentBrowse.map((link) => (
					<Link key={link.link} href={link.link} className={linkStyle}>
						<div
							className={
								"flex items-center gap-5 rounded-md p-2 hover:bg-orange-200/[0.15] hover:text-orange-200" +
								(link.heading.toLowerCase() === segment
									? " bg-orange-200/[0.1] text-orange-200"
									: "")
							}
						>
							<div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
							<h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
								{link.heading}
							</h2>
						</div>
					</Link>
				))}
				<hr className="my-1 w-full rounded-full border border-neutral-800" />
			</section>

			<section className="flex flex-col gap-2">
				{contentExplore.map((link) => (
					<Link key={link.link} href={link.link} className={linkStyle}>
						<div
							className={
								"flex items-center gap-5 rounded-md p-2 hover:bg-sky-200/[0.15] hover:text-sky-200" +
								(link.heading.toLowerCase() === segment
									? " bg-sky-200/[0.1] text-sky-200"
									: "")
							}
						>
							<div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
							<h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
								{link.heading}
							</h2>
						</div>
					</Link>
				))}
				<hr className="my-1 w-full rounded-full border border-neutral-800" />
			</section>

			<section className="flex flex-col gap-2">
				{contentSettings.map((link) => (
					<Link key={link.link} href={link.link} className={linkStyle}>
						<div
							className={
								"flex items-center gap-5 rounded-md p-2 hover:bg-violet-200/[0.15] hover:text-violet-200" +
								+(link.heading.toLowerCase() === segment
									? " bg-violet-200/[0.1] text-violet-200"
									: "")
							}
						>
							<div className="w-5 shrink-0 ml-0.5">{link.icon}</div>
							<h2 className="hidden opacity-0 group-hover:inline-block group-hover:opacity-100">
								{link.heading}
							</h2>
						</div>
					</Link>
				))}
			</section>
		</nav>
	);
};

export default NavDesktop;
