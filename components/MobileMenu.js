import Logo from "@/components/Logo";
import { XIcon } from "@heroicons/react/outline";
import Nav from "@/components/Nav";
import Logout from "@/components/Logout";

export default function MobileMenu({
    links = [],
    show = false,
    onClose = () => null,
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-x-0 top-0 z-50 p-2 sm:hidden">
            <div
                className="divide-y divide-gray-200 rounded-lg bg-gray-50
            text-gray-900 shadow-lg ring-1 ring-gray-900
            ring-opacity-5 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100
            dark:ring-gray-700"
            >
                {links?.length > 0 ? (
                    <div className="space-y-8 px-5 pt-4 pb-6">
                        <div className="center flex items-center justify-between">
                            <Logo />
                            <div className="-mr-2">
                                <button
                                    className="focuse:ring-blue-600 inline-flex items-center justify-center
                rounded-md p-2 focus:outline-none
                focus:ring-2 focus:ring-inset"
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
