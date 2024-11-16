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

      <main className="flex flex-col gap-12">
        <header className="flex flex-row justify-between">
          <div>
            <h1>Badges</h1>
            <div>See all the badges you've earned for your journeys.</div>
          </div>
          <div>
            <Link href="/profile">Back to Profile</Link>
          </div>
        </header>
        <section>
          List
        </section>
      </main>
    </>
  );
}