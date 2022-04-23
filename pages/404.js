import Layout from "../sections/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto py-16 h-full flex flex-col justify-center items-center space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-6xl">404 - Page Not Found</h1>
          <p className="text-xl">nothing to see here...</p>
        </div>
        <Link href="/">
          <a className="p-6 bg-blue-500 text-white rounded hover:drop-shadow-lg ">
            Go Home
          </a>
        </Link>
      </div>
    </Layout>
  );
}
