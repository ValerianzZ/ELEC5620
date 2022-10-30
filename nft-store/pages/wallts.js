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
import {useWeb3React} from '@web3-react/core'
import {userState} from 'react'

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

  const wallts = () => {
    const { address, connectWallet,  } = useWeb3()
    const [collection, setCollection] = useState({})
    const [balance, setBalance] = useState()

    const Web3 = require('web3')
    const provider = new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/ub2BKlAt_8kl54KpRkJ6M82zncKbcsY3')
    const web3 = new Web3(provider)
    const accountBalance = useMemo(()=>{
      if(!address) return

      web3.eth.getBalance(address).then(balance => {
        const ether = web3.utils.fromWei(balance, 'ether')
        setBalance(ether)
        return ether
        })
      },[address])

    const fetchCollectionData = async (sanityClient = client, address) => {
      const query = `*[_type == "users" && walletAddress == "${address}" ] {
        "imageUrl": profileImage.asset->url,
        "bannerImageUrl": bannerImage.asset->url,
        userName
      }`
      
      const collectionData = await sanityClient.fetch(query)
  
      // the query returns 1 object inside of an array
      await setCollection(collectionData[0])
    }

    useEffect(() => {
      fetchCollectionData(client,address)
    }, [address])

    return (
      <div className="overflow-hidden">
    <Header />
    <div className={style.bannerImageContainer}>
    <img
      className={style.bannerImage}
      src={
        collection?.bannerImageUrl
          ? collection.bannerImageUrl
          : 'https://via.placeholder.com/200'
      }
      alt="banner"
    />
  </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
            alt="profile image"
          />
        </div>
      </div>
      <div className={style.midRow}>
            <div className={`text-white`}>Current address: {address}</div>
      </div>
      <div className={style.midRow}>
            <div className={`text-white`}>Current balance: {balance}</div>
      </div>
      </div>
    )
  }

  export default wallts