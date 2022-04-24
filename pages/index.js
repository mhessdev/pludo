import { PencilIcon } from "@heroicons/react/outline";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Layout from "../sections/Layout";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <>
      <Layout>
        <section className="flex flex-col justify-center items-center space-y-10 mt-12 sm:mt-24">
          <div className="space-y-4 max-w-4x1 mx-auto text-center">
            <h1 className="text-4xl sm:text-7xl font-bold capitalize">
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
              className="bg-blue-600 hover:bg-blue-700 text-white
            px-6 py-3 rounded-md border-2 border-blue-600 hover:border-blue-700 
            text-lg sm:text-xl focus:outline-none focus:ring-4
            focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap"
            >
              Log In
            </button>
          ) : (
            <Link href="/items">
              <a className="p-6 bg-blue-500 text-white rounded hover:drop-shadow-lg flex space-x-3 ">
                <PencilIcon className="w-6 h-6 flex-shrink-0" />
                <span>Edit Data</span>
              </a>
            </Link>
          )}
        </section>
      </Layout>
    </>
  );
}
