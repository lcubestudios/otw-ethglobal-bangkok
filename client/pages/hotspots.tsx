import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import Head from "next/head";

export default function HotspotsPage() {
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
      <main>
        <header>
          <h1>Hotspots</h1>
          <div>Description</div>
        </header>
        <section>
          List
        </section>
      </main>
    </>
  );
}