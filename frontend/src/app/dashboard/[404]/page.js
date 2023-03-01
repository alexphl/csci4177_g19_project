import { NoSymbolIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
  return (
    <div className="container mt-[30vh] flex h-full flex-col items-center justify-center gap-12 text-neutral-400">
      <NoSymbolIcon className="w-32" />
      <section className="flex flex-col gap-4 text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="font-medium">
          Page does not exist <br /> or is under construction.
        </p>
      </section>
    </div>
  );
}
