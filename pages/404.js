import Layout from "@/sections/Layout";
import Link from "next/link";

export default function NotFound() {
    return (
        <Layout>
            <div className="container mx-auto flex h-full flex-col items-center justify-center space-y-12 py-16">
                <div className="space-y-6 text-center">
                    <h1 className="text-3xl sm:text-6xl">
                        404 - Page Not Found
                    </h1>
                    <p className="text-xl">nothing to see here...</p>
                </div>
                <Link href="/">
                    <a className="rounded bg-blue-500 p-6 text-white hover:drop-shadow-lg ">
                        Go Home
                    </a>
                </Link>
            </div>
        </Layout>
    );
}
