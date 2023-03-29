/**Author: Olexiy Prokhvatylo B00847680 */

import LoginForm from "./login-register/page"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-neutral-900 to-blue-900/50 place-items-center">
      <div className="my-10 px-6 sm:ml-[10%] flex-auto sm:flex-none">
        <main>
          <h1 className="text-xl leading-relaxed font-medium text-neutral-400 font-display">
            Welcome to <br />
            <strong className="text-3xl sm:text-5xl font-extrabold text-white">STOCKVISION</strong>
          </h1>
        </main>

        <LoginForm />

        {/* <Link href={"/dashboard"} className="font-medium text-white/75 p-2 bg-black/25 rounded-lg">Bypass Login</Link> */}
      </div>
    </div>
  );
}
