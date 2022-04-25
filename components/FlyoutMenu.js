import { useEffect } from "react";
import Nav from "./Nav";
import Logout from "./Logout";

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
        className="rounded-lg shadow-lg ring-1 ring-gray-900
            dark:ring-gray-700 ring-opacity-5 bg-gray-50 text-gray-900
            dark:bg-gray-900 dark:text-gray-100 divide-y divide-gray-200
            dark:divide-gray-700
        "
      >
        {/* {!links?.length > 0 ? (
          <div className="p-5 space-y-8">
            <Nav links={links} />
          </div>
        ) : null} */}
        <div className="px-5 py-3">
          <Logout />
        </div>
      </div>
    </div>
  );
}
