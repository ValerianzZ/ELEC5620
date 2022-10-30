import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NFTCard from "../pages/NFTCard";

const Home = () => {
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);

  const fetchNFTs = async () => {
    try {
      const response = await fetch(`/api/getnfts?wallet=${address}`);
      if (!response.ok) return alert("Something went wrong!");
      const data = await response.json();
      console.log(data);
      if (data.data.totalCount == 0) return alert("Wallet has no NFTs");
      setData(data.data.ownedNfts);
    } catch (err) {
      console.error(err);
      alert("There was an error fetching NFTs!");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 px-5 w-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex space-x-5">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Wallet Address"
          className="px-5 py-2 border rounded-md"
        />
        <button
          onClick={fetchNFTs}
          className="px-5 py-2 bg-green-500 rounded-md text-white hover:bg-green-600 transition-all"
        >
          Fetch NFTs
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {data.map((nft) => (
          <NFTCard key={nft.tokenId} data={nft} />
        ))}
      </div>
    </div>
  );
};

export default Home;
