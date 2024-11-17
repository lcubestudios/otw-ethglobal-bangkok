import { useLogin } from "@privy-io/react-auth";
import { PrivyClient } from "@privy-io/server-auth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookieAuthToken = req.cookies["privy-token"];

  // If no cookie is found, skip any further checks
  if (!cookieAuthToken) return { props: {} };

  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
  const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

  try {
    const claims = await client.verifyAuthToken(cookieAuthToken);
    // Use this result to pass props to a page for server rendering or to drive redirects!
    // ref https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
    console.log({ claims });

    return {
      props: {},
      redirect: { destination: "/dashboard", permanent: false },
    };
  } catch (error) {
    return { props: {} };
  }
};

export default function LoginPage() {
  const pageTitle = `Login | ${process.env.NEXT_PUBLIC_PAGE_TITLE}`
  const router = useRouter();
  const { login } = useLogin({
    onComplete: () => router.push("/profile"),
  });

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <main className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-12">
          <img src="/images/logo.png" className="w-[200px]" />
          <button
            className="w-full p-4 bg-otw-red text-otw-white rounded-lg font-extrabold"
            onClick={login}
          >
          LOG IN
          </button>
        </div>
      </main>
    </>
  );
}
