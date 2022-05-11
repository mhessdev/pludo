import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Logo from "@/components/Logo";
import {
    MoonIcon,
    SunIcon,
    EmojiHappyIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/outline";
import FlyoutMenu from "@/components/FlyoutMenu";
import MobileMenu from "@/components/MobileMenu";
import Button from "@/components/Button";
import Link from "next/link";

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
                    className="h-7 w-7"
                    role="button"
                    onClick={() => setTheme("light")}
                />
            );
        }

        return (
            <MoonIcon
                className="h-7 w-7"
                role="button"
                onClick={() => setTheme("dark")}
            />
        );
    };
    return (
        <header className="border-b border-gray-100 dark:border-gray-700">
            <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
                <Logo />

                <div className="flex items-center space-x-3">
                    {!loading && session ? (
                        <>
                            <Button text="Data" style="medium" link="items" />

                            <Button
                                text="Image Gallery"
                                style="medium"
                                link="images"
                            />
                        </>
                    ) : (
                        ""
                    )}
                    {renderThemeChanger()}
                    {!loading ? (
                        <div>
                            {!session ? (
                                <Button
                                    onClick={signIn}
                                    text="Log In"
                                    style="large"
                                />
                            ) : (
                                <div className="relative" ref={containerRef}>
                                    <button
                                        onClick={() =>
                                            setMenuOpen((prev) => !prev)
                                        }
                                        className="ml-3 flex items-center space-x-1 sm:space-x-2"
                                    >
                                        {session.user.image ? (
                                            <span className="relative h-8 w-8">
                                                <Image
                                                    src={session.user.image}
                                                    alt={session.user.name}
                                                    layout="fill"
                                                    className="rounded-full"
                                                />
                                            </span>
                                        ) : (
                                            <EmojiHappyIcon />
                                        )}
                                        <p className="flex items-center sm:space-x-1">
                                            <span className="hidden sm:inline-block">
                                                Hello,{" "}
                                                {session.user.name?.split(
                                                    " "
                                                )?.[0] ?? "there"}
                                            </span>
                                            {menuOpen ? (
                                                <ChevronUpIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                                            ) : (
                                                <ChevronDownIcon className="mt-1 h-4 w-4 flex-shrink-0" />
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
                <MobileMenu
                    show={menuOpen}
                    onClose={() => setMenuOpen(false)}
                />
            </div>
        </header>
    );
}
