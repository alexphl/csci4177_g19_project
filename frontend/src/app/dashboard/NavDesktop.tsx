'use client'

import { memo } from "react";
import Link from "next/link";
import { UserIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import { useSelectedLayoutSegment } from "next/navigation";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

const NavDesktop = () => {
	const segment = useSelectedLayoutSegment();

	console.log(segment);

	return (
		<nav className="group z-[90] hidden h-screen w-24 min-w-0 max-w-fit flex-col gap-3 border-r border-neutral-800 bg-black/[0.5] p-3 text-sm font-medium text-neutral-400 shadow-lg saturate-200 backdrop-blur-lg transition-all hover:w-60 hover:max-w-sm hover:text-neutral-200 md:fixed md:flex lg:p-4 2xl:p-5">
			<button className="mx-auto mb-12 flex aspect-square w-fit flex-none items-center rounded-full border-2 border-neutral-800 p-2 group-hover:mx-0">
				<UserIcon className="h-5 w-5 text-neutral-600" />
			</button>

			<Link href="/dashboard" className="block">
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
					<Link key={link.link} href={link.link}>
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
					<Link key={link.link} href={link.link}>
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
					<Link key={link.link} href={link.link}>
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

export default memo(NavDesktop);
