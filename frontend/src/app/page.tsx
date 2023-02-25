"use client";

import Link from "next/link";

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function HomePage() {
  return (
    <div className="flex h-screen w-screen place-items-center">
      <div className="m-10 sm:ml-[10%]">
        <main className="mb-24">
          <h1 className="mb-8 h-fit text-6xl font-extralight sm:mb-4">
            Dummy landing page
          </h1>
          <h2 className="h-fit text-3xl text-neutral-300">
            for our stock tracking app.
          </h2>
        </main>

        <div className="mb-8 flex gap-4 font-medium">
          <Link href="/login-register">
            <div className="rounded-lg border border-neutral-600 bg-black px-6 py-2 shadow-lg">
              Login
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="rounded-lg border border-neutral-600 bg-black px-6 py-2 shadow-lg">
              Bypass Login
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
