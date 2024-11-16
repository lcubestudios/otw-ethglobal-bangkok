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
      user,
      latitude,
      longitude,
      timestamp,
      placeName,
      country,
      city,
      zipCode,
      blockNumber,
      blockTimestamp,
      transactionHash,
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
    console.log('location', navigator.geolocation)
  }, [])

  async function fetchData() {
    try {
      const response = await client.query(query).toPromise();
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
  const pageTitle = `Profile | ${process.env.NEXT_PUBLIC_PAGE_TITLE}`
  const router = useRouter();
  const {
    ready,
    authenticated,
    logout
  } = usePrivy();

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
          <div className="flex flex-row justify-between items-center">
            <div className="flex-1">
              <h1 className="m-0">Profile</h1>
            </div>
            <button
              onClick={logout}
              className="p-4 bg-gray-200 hover:bg-gray-400 rounded-lg"
            >
              LOGOUT
            </button>
          </div>
          <div>Explore a complete list of your travel adventures.</div>
        </header>
        <section>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <ul className="flex flex-col gap-2 text-sm ">
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
          </div>
        </section>
      </main>
    </>
  );
}