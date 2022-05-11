import Head from "next/head";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { useRouter } from "next/router";

export default function Layout({ children, pageMeta }) {
    const router = useRouter();
    const meta = {
        title: "Pludo",
        description: "Pludo is a game database CMS",
        type: "website",
        ...pageMeta,
    };
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                <link rel="icon" href="/fav/favicon.ico" />
                {/* Open Graph */}
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:type" content={meta.type} />
                <meta
                    property="og:url"
                    content={`http://localhost:3000${router.asPath}`}
                />
                <meta property="site_name" content="Pludo" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/fav/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/fav/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/fav/favicon-16x16.png"
                />
                {/* <link rel="manifest" href="/fav/site.webmanifest" /> */}
                <link
                    rel="mask-icon"
                    href="/fav/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="container mx-auto flex-grow px-4 sm:px-6">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
