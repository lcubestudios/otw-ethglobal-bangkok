import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import Head from "next/head";
import Link from "next/link";

export default function BadgesPage() {
  const pageTitle = `Badges | ${process.env.NEXT_PUBLIC_PAGE_TITLE}`
  const router = useRouter();
  const {
    ready,
    authenticated,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex-1">
              <h1 className="m-0">Logs</h1>
            </div>
            <div>
              <Link className="text-xs" href="/profile">Back to Profile</Link>
            </div>
          </div>
          <div>Explore a complete list of your travel adventures.</div>
        </header>
        <section>
          List
        </section>
      </main>
    </>
  );
}