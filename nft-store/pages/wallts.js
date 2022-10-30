import Header from '../pages/Header'
import React, { useEffect, useState, useMemo } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import {ethers} from 'ethers'
import { client } from '../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'

const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
}

const Wallts = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
    const { address, connectWallet,  } = useWeb3()
    const [collection, setCollection] = useState({})

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

useEffect(() => {
    connectWalletHandler()
	if(defaultAccount){
	provider.getBalance(defaultAccount)
	.then(balanceResult => {
		setUserBalance(ethers.utils.formatEther(balanceResult));
	})
	};
}, [defaultAccount])

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
		<div className='walletCard'>
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
            <div className={`text-white`}>Current address: {defaultAccount}</div>
      </div>
      <div className={style.midRow}>
            <div className={`text-white`}>Current balance: {userBalance}</div>
      </div>
			{errorMessage}
		</div>
	);
}

export default Wallts