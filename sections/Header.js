import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import Logo from "../components/Logo";
import {
  MoonIcon,
  SunIcon,
  EmojiHappyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import FlyoutMenu from "../components/FlyoutMenu";
import MobileMenu from "../components/MobileMenu";

export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    }

    return (
      <MoonIcon
        className="w-7 h-7"
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  };
  return (
    <header className="border-b border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Logo />

        <div className="flex items-center space-x-3">
          {renderThemeChanger()}
          {!loading ? (
            <div>
              {!session ? (
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white
              px-6 py-2 rounded-md border-2 border-blue-600 hover:border-blue-700 
              text-lg sm:text-xl focus:outline-none focus:ring-4
              focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
                  onClick={() => signIn()}
                >
                  Log In
                </button>
              ) : (
                <div className="relative" ref={containerRef}>
                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="ml-3 flex items-center space-x-1 sm:space-x-2"
                  >
                    {session.user.image ? (
                      <img
                        className="w-8 h-8 rounded-full relative"
                        src={session.user.image}
                        alt={session.user.name}
                      />
                    ) : (
                      <EmojiHappyIcon className="w-6 h-6 flex-shrink-0" />
                    )}
                    <p className="flex items-center sm:space-x-1">
                      <span className="hidden sm:inline-block">
                        Hello, {session.user.name?.split(" ")?.[0] ?? "there"}
                      </span>
                      {menuOpen ? (
                        <ChevronUpIcon className="w-4 h-4 flex-shrink-0 mt-1" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1" />
                      )}
                    </p>
                  </button>
                  <div className="hidden md:block">
                    <FlyoutMenu
                      show={menuOpen}
                      onClose={() => setMenuOpen(false)}
                      containerRef={containerRef}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="block md:hidden">
        <MobileMenu show={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
