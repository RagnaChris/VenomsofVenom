import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { TopNav } from "~/components/TopNav";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Venoms of Venom</title>
        <link rel="icon" href="/assets/venom.png" />
        <style>
          @import
          url(&quot;https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap&quot;);
        </style>
      </Head>
      <div className="px-auto my-auto min-h-screen flex-grow bg-gradient-radial-tl-and-br from-emerald-800 via-black via-50%">
        <TopNav />
        <div className="w-full flex-grow items-start">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
