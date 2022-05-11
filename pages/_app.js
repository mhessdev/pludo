import "@/styles/globals.css";
import NextProgress from "next-progress";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { AppWrapper } from "@/components/context/AppWrapper";

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvider enableSystem={true} attribute="class">
                <NextProgress />
                <AppWrapper>
                    <Component {...pageProps} />
                </AppWrapper>
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;
