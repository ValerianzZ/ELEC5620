import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useEffect, useMemo, useState } from 'react'
import Logo from '../assets/logo.png'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  headerItems: ` flex items-center justify-end`,
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
  headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}


const Header = () => {
  const { provider } = useWeb3()
  const [NFTlist, setNFTlist] = useState([])
  const [listings, setListings] = useState([])
  const [value, setValue] = useState('');

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-goerli.g.alchemy.com/v2/ub2BKlAt_8kl54KpRkJ6M82zncKbcsY3'
    )
    return sdk.getNFTModule('0x8EF8aF706613E6D184BE492196A68D80bAC35CC3')
  }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return

    ;(async () => {
      const nfts = await nftModule.getAll()
      setNFTlist(nfts)
      })()
    }, [nftModule])

  // create marketplace module
  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
    )

    return sdk.getMarketplaceModule(
      '0x02099f6232AF4Df217EBC0ba129a744EB51F779E'
    )
  }, [provider])

  useEffect(() => {
    if (!marketPlaceModule) return

    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  const handleChange = event => {
    setValue(event.target.value);
    console.log(event.target.value);

  };

  const onSearch = (searchItem) => {
    const listing = NFTlist.find((listing) => listing.name === searchItem)
    const listed = listings.find((listing) => listing.asset.name === searchItem)
    if (Boolean(listing)){
      var path = '/nfts/'+ listing.id.toString()
      if(Boolean(listed)){
        path = path + '?isListed=true'
      }else{
        console.log(listed)
        path = path + '?isListed=false'
      }
      window.location.href=path
    }else{
      const toastHandler = toast
      toastHandler.success(`No result`, {
        style: {
          background: '#04111d',
          color: '#fff',
      },
    })
    }
  }

  return (
    <div className={style.wrapper}>
    <Toaster position="top-center" reverseOrder={false} />
      <Link href="/">
        <div className={style.logoContainer}>
          <Image src={Logo} height={40} width={40} />
          <div className={style.logoText}>NFT-CLUB</div>
        </div>
      </Link>
      <div className={style.searchBar}>
        <div className={style.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={style.searchInput}
          type="text" 
          placeholder="Search"
          value={value}
          onChange={handleChange}
        />
        <div className={'w-full text-white'}>
        {NFTlist.filter(NFT=>{
          const searchItem = value
          const NFTname = NFT.name

          return searchItem && NFTname.toString().startsWith(searchItem)
        })
          .map((NFT) => (
          <div onClick={()=>onSearch(NFT.name)}>{NFT.name}</div>
        ))}
        </div>
        <button className={style.searchIcon} 
          onClick={()=>onSearch(value)}>
          search</button>
      </div>
      <div className={style.headerItems}>
        <Link href="/Collections">
          <div className={style.headerItem}> Collections </div>
        </Link>
        <Link href="/broadcast">
          <div className={style.headerItem}> Notification </div>
        </Link>
        <Link href="/createindex">
        <div className={style.headerItem}> Create </div>
        </Link>
        <Link href="/Profile">
          <div className={style.headerIcon}>
            <CgProfile />
          </div>
        </Link>
        <Link href="/wallts">
        <div className={style.headerIcon}>
          <MdOutlineAccountBalanceWallet />
        </div>
        </Link>
      </div>
    </div>
    
  )
}

export default Header