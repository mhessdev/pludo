import { useEffect } from "react";
import Nav from "@/components/Nav";
import Logout from "@/components/Logout";

export default function FlyoutMenu({
    links = [],
    show = false,
    containerRef = null,
    onClose = () => null,
}) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                onClose();
            }
        };
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, [containerRef, onClose]);

    if (!show) return null;

    return (
        <div className="absolute top-10 right-0 z-50 hidden sm:block">
            <div
                className="divide-y divide-gray-200 rounded-lg bg-gray-50
            text-gray-900 shadow-lg ring-1 ring-gray-900
            ring-opacity-5 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100
            dark:ring-gray-700
        "
            >
                {!links?.length > 0 ? (
                    <div className="space-y-8 p-5">
                        <Nav links={links} />
                    </div>
                ) : null}
                <div className="px-5 py-3">
                    <Logout />
                </div>
            </div>
        </div>
    );
}
