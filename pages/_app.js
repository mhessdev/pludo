import "../styles/globals.css";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <TopProgressBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
