import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import Head from "next/head";
import Link from "next/link";

export default function HotspotsPage() {
  const pageTitle = `Hot Spots | ${process.env.NEXT_PUBLIC_PAGE_TITLE}`
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
            <h1>Hot Spots</h1>
            <div>Discover locations where you can check in and earn unique badges.</div>
          </div>
          <div>
            <Link href="/profile">View Profile</Link>
          </div>
        </header>
        <section>
          List
        </section>
      </main>
    </>
  );
}