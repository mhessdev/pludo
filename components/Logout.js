import { LogoutIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
export default function Logout() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="-mx-2 -my-1 px-2 py-1 flex justify-center items-center
        space-x-2 opacity-70 hover:opacity-100 focus:outline-none
        focus:ring-2 focus:ring-blue-600 rounded"
    >
      <LogoutIcon className="flex-shrink-0 h-7 w-7" />
      <span className="font-medium capitalize">Logout</span>
    </button>
  );
}
