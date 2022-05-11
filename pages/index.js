import { PencilIcon } from "@heroicons/react/outline";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Layout from "@/sections/Layout";

export default function Home() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    return (
        <>
            <Layout>
                <section className="mt-12 flex flex-col items-center justify-center space-y-10 sm:mt-24">
                    <div className="max-w-4x1 mx-auto space-y-4 text-center">
                        <h1 className="text-4xl font-bold capitalize sm:text-7xl">
                            <span className="block">The Game Database CMS</span>
                        </h1>

                        <span className="block">
                            cause rufio is lazy and dilbo is cheap
                        </span>
                    </div>
                    {loading ? null : !session ? (
                        <button
                            type="button"
                            onClick={() => signIn()}
                            className="whitespace-nowrap rounded-md border-2
            border-blue-600 bg-blue-600 px-6 py-3 text-lg text-white 
            focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50
            hover:border-blue-700 hover:bg-blue-700 sm:text-xl"
                        >
                            Log In
                        </button>
                    ) : (
                        <Link href="/items">
                            <a className="flex space-x-3 rounded bg-blue-500 p-6 text-white hover:drop-shadow-lg ">
                                <PencilIcon className="h-6 w-6 flex-shrink-0" />
                                <span>Edit Data</span>
                            </a>
                        </Link>
                    )}
                </section>
            </Layout>
        </>
    );
}
