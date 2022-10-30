import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NFTCard from "../pages/NFTCard";
import Header from "./Header";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
}

const explorerindex = () => {
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
    <div>
      <Header />
      <div className={style.midRow}>
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

export default explorerindex;
