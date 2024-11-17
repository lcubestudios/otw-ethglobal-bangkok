// @ts-nocheck

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createClient, debugExchange, cacheExchange, fetchExchange } from 'urql';

import Head from "next/head";
import Link from "next/link";

const APIURL = process.env.NEXT_PUBLIC_LOG_QUERY_URL

const query = `
  query {
    locationRecordeds(
      orderBy: timestamp,
      orderDirection: desc
    ) {
      id,
      timestamp,
      placeName
    }
  }
`;

const client = createClient({
  url: APIURL,
  exchanges: [debugExchange, cacheExchange, fetchExchange]
})

export default function ProfilePage() {
  const pageTitle = `Profile | ${process.env.NEXT_PUBLIC_PAGE_TITLE}`
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    ready,
    authenticated,
    user,
    logout,
  } = usePrivy();

  useEffect(() => {
    fetchData()
  })

  async function fetchData() {
    const variables = {};

    try {
      const response = await client.query(query, variables).toPromise();
      if (response.error) {
        throw new Error(response.error.message);
      }

      setData(response.data.locationRecordeds);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  
    // Get hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Get month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    // Combine into desired format
    return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-start">
            <div className="flex-1 flex flex-row gap-4">
              <img src="/images/logo.png" className="w-[60px]" />
              <h1 className="m-0">Profile</h1>
            </div>
            <button
              onClick={logout}
              className="text-xs p-2 bg-otw-yellow text-otw-white rounded-lg mt-2"
            >
              LOGOUT
            </button>
          </div>
          <div>Explore a complete list of your travel adventures.</div>
        </header>
        <section className="p-4 bg-otw-gray text-otw-black rounded-md">
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && data && (
              <ul className="flex flex-col gap-2 text-sm">
                {data.map((record) => (
                  <li 
                    key={record.id}
                    className="grid grid-cols-3 pb-2 border-b-solid border-b-[1px] border-gray-300"
                  >
                    <span className="col-span-2">{record.placeName}</span>
                    <span className="col-span-1">{formatTimestamp(record.timestamp)}</span>
                  </li>
                ))}
              </ul>
            )}
            {!loading && !error && !data && (
              <p>No records yet, click "CHECK IN" button to start saving your memories!</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}