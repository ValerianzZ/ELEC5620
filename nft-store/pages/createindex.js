import { useAddress, useMetamask, useNFTCollection } from "@thirdweb-dev/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const address = useAddress();
  const connectUsingMetamask = useMetamask();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const collection = useNFTCollection(
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.post("/api/generate", { name, description, image });

    const { signature } = res.data;

    await collection.signature.mint(signature);

    alert("NFT Minted successfully!");
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {address ? (
        <>
          <form onSubmit={onSubmit}>
            <div>
              Name:{" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              Description:{" "}
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              Image URL:{" "}
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                Mint NFT
              </button>
            </div>
          </form>
        </>
      ) : (
        <button onClick={connectUsingMetamask}>Connect using Metamask</button>
      )}
    </div>
  );
}
