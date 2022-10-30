import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../pages/Header'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'

const style = {
    wrapper: `bg-[#303339] flex-auto w-full h-[10rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
    bannerImageContainer: `w-screen overflow-hidden flex justify-center items-center`,
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

  const broadcast = () => {
    const { address, connectWallet } = useWeb3()
    const [collection, setCollection] = useState([])
    
    const fetchCollectionData = async (sanityClient = client) => {
      const query = `*[_type == "broadcast"] {
        title,
        content,
      }`
      
      const collectionData = await sanityClient.fetch(query)
  
      // the query returns 1 object inside of an array
      await setCollection(collectionData)
      console.log(collection.content)
    }

    useEffect(() => {
      fetchCollectionData(client,address)
    }, [address])


    return (
      <div className="overflow-hidden">
    <Header />
    {collection.map((collection) => (
    <div className={style.wrapper}>
    <div className={style.midRow}>
        <div className={`text-white`}>Title: {collection?.title}</div>
    </div>
    <div className={style.midRow}>
        <div className={`text-white`}>Content: {collection?.content}</div>
    </div>
    </div>
    ))}
     
      </div>
    )
  }

  export default broadcast