import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import Head from "next/head";
import Link from "next/link";

export default function ProfilePage() {
  const pageTitle = `Profile | ${process.env.NEXT_PUBLIC_PAGE_TITLE}`
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
            <h1>Profile</h1>
            <div>Welcome! View your latest travel logs and earned badges.</div>
          </div>
          <div>
            <Link href="/hotspots">View Hotspots</Link>
          </div>
        </header>
        <section>
          <div className="flex flex-row justify-between">
            <h2>Latest Logs</h2>
            <span><Link href="/logs">see all logs</Link></span>
          </div>
          <div>List</div>
        </section>
        <section>
          <div className="flex flex-row justify-between">
            <h2>Latest Badges</h2>
            <span><Link href="/badges">see all badges</Link></span>
          </div>
          <div>List</div>
        </section>
      </main>
    </>
  );
}