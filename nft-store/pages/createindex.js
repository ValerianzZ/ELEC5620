import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useMemo } from "react";
import axios from "axios";
import Header from '../pages/Header'

const Createindex = () => {
  const { address, connectWallet } = useWeb3()
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { provider } = useWeb3()

  //create NFT module
  const collection = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
    )
    return sdk.getNFTModule('0x7D98cf0A84669Fa5f13A4EC3070d0C0ca4060887')
  }, [provider])

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, description, image)

    const body = { name, description, image }
    const res = await fetch(`/api/generate?wallet=${body}`);

    const { signature } = await res.json()
    console.log(signature)

    await collection.mint(signature);

    alert("NFT Minted successfully!");
    setLoading(false);
  };

  return (
    <>
    <Header />
    
    <div className={styles.container}>
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
        <button onClick={connectWallet}>Connect using Metamask</button>
      )}
    </div>
    </>
  );
}

export default Createindex;