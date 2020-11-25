import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { MuiDecorator } from "../mui";
import * as gtag from "../lib/gtag";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Remove the server-side injected CSS (@see https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js)
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  });

  // GA
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Bluebricks.</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiDecorator>
        <Component {...pageProps} />
      </MuiDecorator>
    </>
  );
}
