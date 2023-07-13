import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-10">
        <div className="w-4/6 space-y-4 py-32">
          <h1 className="text-4xl sm:text-6xl">
            The first NFT tracking tool and hypometer for{" "}
            <span className="text-emerald-500">Venom NFTs</span>
          </h1>
          <h2 className="text-2xl">Powered by Venoms of Venom NFT</h2>
          <div className="flex space-x-3">
            <Link
              href="/projects"
              className="rounded-lg border border-black bg-gradient-to-b from-green-500 via-emerald-400 to-cyan-300 px-5 py-4 text-center text-xl font-bold text-black sm:text-2xl"
            >
              Explore Trender
            </Link>
            <button className="rounded-lg border border-x-emerald-300 border-b-teal-500 border-t-green-400 px-10 py-4 text-center text-xl font-bold sm:text-2xl">
              Buy a Venom
            </button>
          </div>
        </div>
        <div className="w-3/5 rounded-2xl border border-transparent bg-green-300/10">
          <h1 className="py-5 text-center text-xl font-bold text-emerald-400">
            Product
          </h1>
          <p className="px-2 pb-28 text-center">
            Find out the most trending NFTs on Venom, their utilities and how
            the venom community are hyped about each NFT project.
          </p>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h1 className="flex justify-center text-center">
          Powered by{" "}
          <Image
            src="/assets/venom.png"
            alt="Venoms of Venom"
            width={50}
            height={50}
          />
        </h1>
      </div>
    </>
  );
};

export default Home;
