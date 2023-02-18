import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load components
const Search = dynamic(() => import("./CustomerSearch"));

const h2Style = "text-xl font-bold";
const subheadingStyle = "text-sm font-medium text-neutral-400";
const linkCardStyle =
  "h-32 w-32 flex p-5 flex-auto text-orange-200 border border-neutral-800 bg-black rounded-2xl shadow-xl shadow-orange-200/[0.08] shadow-inner hover:scale-[1.03] active:scale-95 transition-all cursor-pointer";

// WIP TODO: use array map to render dashboard links
import { contentBrowse, contentExplore, contentSettings } from "./NavSchema";

export default function IndexContent() {
  return (
    <div
      color="primary"
      className="container mt-20 mb-12 flex max-w-xl flex-col gap-10 px-6"
    >
      <h1 className="text-2xl leading-relaxed text-neutral-400">
        Welcome to <br />
        <strong className="text-4xl text-white">STOCKVISION</strong>
      </h1>

      <section>
        <h2 className={h2Style}>Search</h2>
        <div>
          <p className={subheadingStyle}>
            Search for customers by name, username, email or street address:
          </p>
          <Search />
          <br />
        </div>
      </section>

      <section>
        <h2 className={h2Style}>Browse</h2>
        <p className={subheadingStyle}>
          Browse customers, accounts and transactions
        </p>

        <div className="mt-4 flex w-full flex-wrap gap-3">
          {contentBrowse.map((link) => (
            <Link className={linkCardStyle} key={link.link} href={link.link}>
              <div className="w-6">{link.icon}</div>
              <p className="w-full self-end text-end font-medium leading-none">
                {link.heading}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={h2Style}>Explore</h2>
        <p className={subheadingStyle}>
          View analytic tools like charts, graphs and maps of StockVision&apos;s
          users
        </p>

        <div className="mt-4 flex w-full flex-wrap gap-3">
          {contentExplore.map((link) => (
            <Link className={linkCardStyle} key={link.link} href={link.link}>
              <div className="w-6">{link.icon}</div>
              <p className="w-full self-end text-end font-medium leading-none">
                {link.heading}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={h2Style}>Configure</h2>
        <p className={subheadingStyle}>Manage your profile settings</p>

        <div className="mt-4 flex w-full flex-wrap gap-3">
          {contentSettings.map((link) => (
            <Link className={linkCardStyle} key={link.link} href={link.link}>
              <div className="w-6">{link.icon}</div>
              <p className="w-full self-end text-end font-medium leading-none">
                {link.heading}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
