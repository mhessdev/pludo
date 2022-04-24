import { Logo } from "./Logo";
import { XIcon } from "@heroicons/react/outline";
import Nav from "./Nav";
import Logout from "./Logout";

export default function MobileMenu({
  links = [],
  show = false,
  onClose = () => null,
}) {
  if (!show) return null;

  return (
    <div className="fixed top-0 z-50 inset-x-0 p-2 sm:hidden">
      <div
        className="rounded-lg shadow-lg ring-1 ring-gray-900
            dark:ring-gray-700 ring-opacity-5 bg-gray-50 text-gray-900
            dark:bg-gray-900 dark:text-gray-100 divide-y divide-gray-200
            dark:divide-gray-700"
      >
        {links?.length > 0 ? (
          <div className="px-5 pt-4 pb-6 space-y-8">
            <div className="flex items-center justify-between center">
              <Logo />
              <div className="-mr-2">
                <button
                  className="rounded-md p-2 inline-flex items-center
                justify-center focus:outline-none focus:ring-2
                focus:ring-inset focuse:ring-blue-600"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6 flex-shrink-0" />
                </button>
              </div>
            </div>
            <Nav />
          </div>
        ) : null}
        <div className="px-5 py-3">
          <Logout />
        </div>
      </div>
    </div>
  );
}
