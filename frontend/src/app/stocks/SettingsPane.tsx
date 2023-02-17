import { UserIcon } from "@heroicons/react/20/solid";

const SettingsPane = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 border border-neutral-800 bg-black text-neutral-500 sm:rounded-2xl">
      <button className="flex cursor-default items-center rounded-full bg-black p-5 shadow-xl outline-none">
        <UserIcon className="h-20 w-20" />
      </button>

      <p className="text-lg">User Preferences Pane</p>
    </div>
  );
};

export default SettingsPane;
