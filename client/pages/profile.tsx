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

      <main className="flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex-1">
              <h1 className="m-0">Profile</h1>
            </div>
            <div>
              <Link className="text-xs" href="/hotspots">View Hotspots</Link>
            </div>
          </div>
          <div>Welcome! View your latest travel logs and earned badges.</div>
        </header>
        <section>
          <div className="flex flex-row justify-between items-center">
            <h2 className="m-0">Latest Logs</h2>
            <span><Link className="text-xs" href="/logs">see all logs</Link></span>
          </div>
          <div>List</div>
        </section>
        <section>
          <div className="flex flex-row justify-between items-center">
            <h2 className="m-0">Latest Badges</h2>
            <span><Link className="text-xs" href="/badges">see all badges</Link></span>
          </div>
          <div>List</div>
        </section>
      </main>
    </>
  );
}