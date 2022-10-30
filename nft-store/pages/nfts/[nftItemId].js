import Header from '../Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTimage from '../NFT/NFTimage'
import NFTdetail from '../NFT/NFTdetail'
import NFTitemActivity from '../NFT/NFTitemActivity'
import Purchase from '../Purchase'

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
  }

const NFTItem = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if (!provider) return
    
        const sdk = new ThirdwebSDK(
          provider.getSigner()
        )
        return sdk.getNFTModule('0x7D98cf0A84669Fa5f13A4EC3070d0C0ca4060887')
      }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return

        ;(async () => {
        const nfts = await nftModule.getAll()

        const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftItemId)

        setSelectedNft(selectedNftItem)
        })()
    }, [nftModule])

    // create marketplace module
    const marketPlaceModule = useMemo(() => {
        if (!provider) return
    
        const sdk = new ThirdwebSDK(
          provider.getSigner(),
          'https://eth-goerli.g.alchemy.com/v2/ub2BKlAt_8kl54KpRkJ6M82zncKbcsY3'
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

    return (
        <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTimage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <NFTdetail selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <NFTitemActivity />
        </div>
      </div>
    </div>
    )
}
    export default NFTItem