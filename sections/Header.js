import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import Logo from "../components/Logo";
import Image from "next/image";
import { MoonIcon, SunIcon, EmojiHappyIcon } from "@heroicons/react/outline";

export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

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

        <div className="flex items-center space-x-3 divide-x-2 divide-slate-700">
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
                <div className="ml-3 flex items-center space-x-1 sm:space-x-2">
                  {session.user.image ? (
                    <img
                      className="w-8 h-8 rounded-full relative"
                      src={session.user.image}
                      alt={session.user.name}
                    />
                  ) : (
                    <EmojiHappyIcon />
                  )}

                  <span>
                    Hello, {session.user.name?.split(" ")?.[0] ?? "there"}
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
