import { type NextPage } from "next";

const Home: NextPage = () => {
  return <>
    <div className="pb-10">
      <div className="pl-32 py-32">
        <h1 className="text-6xl">The first NFT tracking tool and hypometer for <span className="text-emerald-500">Venom NFTs</span></h1><br></br>
        <h2 className="text-2xl">Powered by Venoms of Venom NFT</h2>
        <br></br><br></br>
        <button className="text-center text-black font-bold text-2xl border border-black rounded-lg bg-gradient-to-b from-green-500 via-emerald-400 to-cyan-300 py-4 px-5">Explore Trender</button>
        <button className="text-center font-bold text-2xl border border-x-emerald-300 border-b-teal-500 border-t-green-400 rounded-lg py-4 px-10 mx-10">Buy a Venom</button>
      </div>
      <div className="border rounded-2xl border-transparent bg-green-300/10 mx-56">
          <h1 className="text-center text-emerald-400 font-bold text-xl py-5">Product</h1>
          <p className="px-16 pb-28">Find out the most trending NFTs on Venom, their utilities and how the venom community are hyped about each NFT project.</p>
      </div>
      <br></br><br></br><br></br>
      <h1 className="text-center">Powered by `Venom`</h1>
    </div>
  </>
};

export default Home;