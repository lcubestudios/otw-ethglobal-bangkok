import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createClient, debugExchange, cacheExchange, fetchExchange } from 'urql';

import Head from "next/head";
import Link from "next/link";

const APIURL = process.env.NEXT_PUBLIC_LOG_QUERY_URL

const query = `
  query {
    tokens(first: 20) {
      id
      name
      symbol
      decimals
    }
  }
`

const client = createClient({
  url: APIURL,
  exchanges: [debugExchange, cacheExchange, fetchExchange]
})

export default function ProfilePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const response = await client.query(query).toPromise();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setData(response.data.tokens); // Save fetched tokens to state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
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
              <Link className="text-xs" href="/hotspots">
                View Hotspots
              </Link>
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
        <section>
          <div className="flex flex-row justify-between items-center">
            <h2 className="m-0">Test Tokens</h2>
            <span>
              <Link className="text-xs" href="/tokens">
                see all tokens
              </Link>
            </span>
          </div>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <ul>
                {data.map((token) => (
                  <li key={token.id}>
                    {token.name} ({token.symbol}) - Decimals: {token.decimals}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}