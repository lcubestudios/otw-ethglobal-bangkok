import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import PageFooter from "../components/page/footer";

function MyApp({ Component, pageProps }: AppProps) {
  const pageTitle = `${process.env.NEXT_PUBLIC_PAGE_TITLE}`;
  const router = useRouter();

  const isHomePage = router.pathname === "/";

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/AdelleSans-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/AdelleSans-Regular.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/AdelleSans-Semibold.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/AdelleSans-Semibold.woff2"
          as="font"
          crossOrigin=""
        />

        <link rel="icon" href="/favicons/favicon.png" sizes="any" />
        <link rel="icon" href="/favicons/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/manifest.json" />

        <title>{pageTitle}</title>
        <meta name="description" content="Privy Auth Starter" />
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
          embeddedWallets: {
            createOnLogin: "all-users",
          },
        }}
      >
        <div id="viewport" className="flex flex-col overflow-hidden gap-8 bg-otw-black text-otw-white">
          <section className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 overflow-y-auto" >
              <Component {...pageProps} />
            </div>
          </section>
          {!isHomePage && (<PageFooter />)}
        </div>
      </PrivyProvider>
    </>
  );
}

export default MyApp;
