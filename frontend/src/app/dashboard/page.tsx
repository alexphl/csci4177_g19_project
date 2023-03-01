import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load components
const Search = dynamic(() => import("./CustomerSearch"));

const subheadingStyle = "text-sm font-medium text-neutral-400";
const linkCardStyle =
  "h-32 w-40 flex p-5 flex-auto border border-neutral-800 bg-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ";

import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

export default function Dashboard() {

  return (
    <div
      className="container mb-12 flex max-w-2xl 2xl:max-w-5xl flex-col gap-10 px-6 pt-20 transition-all"
    >
      <h1 className="text-2xl leading-relaxed text-neutral-400">
        Welcome to <br />
        <strong className="text-4xl text-white">STOCKVISION</strong>
      </h1>

      <section>
        <h2 className="text-xl font-bold">Search</h2>
        <div>
          <p className={subheadingStyle}>
            Search for customers by name, username, email or street address:
          </p>
          <Search />
          <br />
        </div>
      </section>

      <section>
        <h2 className="text-orange-200 text-xl font-bold">Browse</h2>
        <p className={subheadingStyle}>
          Browse customers, accounts and transactions
        </p>

        <div className="mt-4 flex w-full flex-wrap gap-3">
          {contentBrowse.map((link) => (
            <Link className={linkCardStyle + "text-orange-200 shadow-orange-200/[0.08]"} key={link.link} href={link.link}>
              <div className="w-6 shrink-0">{link.icon}</div>
              <p className="w-full self-end text-end font-medium leading-none">
                {link.heading}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sky-200 text-xl font-bold">Explore</h2>
        <p className={subheadingStyle}>
          View analytic tools like charts, graphs and maps of StockVision&apos;s
          users
        </p>

        <div className="mt-4 flex w-full flex-wrap gap-3">
          {contentExplore.map((link) => (
            <Link className={linkCardStyle + "text-sky-200 shadow-sky-200/[0.08]"} key={link.link} href={link.link}>
              <div className="w-6 shrink-0">{link.icon}</div>
              <p className="w-full self-end text-end font-medium leading-none">
                {link.heading}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-violet-200 text-xl font-bold">Configure</h2>
        <p className={subheadingStyle}>Manage your profile settings</p>

        <div className="mt-4 flex w-full flex-wrap gap-3">
          {contentSettings.map((link) => (
            <Link className={linkCardStyle + "text-violet-200 shadow-violet-200/[0.08]"} key={link.link} href={link.link}>
              <div className="w-6 shrink-0">{link.icon}</div>
              <p className="self-end ml-auto font-medium leading-none">
                {link.heading}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
