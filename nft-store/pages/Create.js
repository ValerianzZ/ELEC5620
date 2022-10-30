import {
    useMarketplace,
    useNetwork,
    useNetworkMismatch,
  } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../pages/Header'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'

const Create = () => {
    const { provider } = useWeb3()
    
      // create thirdweb marketplace module
      const marketplace = useMemo(() => {
        if (!provider) return
      
        const sdk = new ThirdwebSDK(
          provider.getSigner(),
          'https://eth-goerli.g.alchemy.com/v2/ub2BKlAt_8kl54KpRkJ6M82zncKbcsY3'
        )
        return sdk.getMarketplaceModule(
          '0x02099f6232AF4Df217EBC0ba129a744EB51F779E'
        )
      }, [provider])

      // This function gets called when the form is submitted.
// The user has provided:
// - contract address
// - token id
// - type of listing (either auction or direct)
// - price of the NFT
// This function gets called when the form is submitted.
async function handleCreateListing(e) {
    try {
      // Prevent page from refreshing
      e.preventDefault();
  
      // Store the result of either the direct listing creation or the auction listing creation
      let transactionResult = undefined;
  
      // De-construct data from form submission
      const { listingType, contractAddress, tokenId, price } = e.target.elements;
  
      // Depending on the type of listing selected, call the appropriate function
      // For Direct Listings:
      if (listingType.value === "directListing") {
        transactionResult = await createDirectListing(
          contractAddress.value,
          tokenId.value,
          price.value,
        );
      }
  
      // For Auction Listings:
      if (listingType.value === "auctionListing") {
        transactionResult = await createAuctionListing(
          contractAddress.value,
          tokenId.value,
          price.value,
        );
      }
  
      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        router.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function createAuctionListing(
    contractAddress,
    tokenId,
    price,
  ) {
    try {
        const transaction = await marketplace.auction.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });
  
      return transaction;
    } catch (error) {
      console.error(error,marketplace);
    }
  }
  
  async function createDirectListing(
    contractAddress,
    tokenId,
    price,
  ) {
    try {
      const transaction = await marketplace.direct.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });
  
      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

    return (
        <div>
        <Header />
        <form onSubmit={(e) => handleCreateListing(e)}>
          <div>
            {/* Form Section */}
            <div>
              <h1>Upload your NFT to the marketplace:</h1>
      
              {/* Toggle between direct listing and auction listing */}
              <div>
                <input
                  type="radio"
                  name="listingType"
                  id="directListing"
                  value="directListing"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="listingType"
                  id="auctionListing"
                  value="auctionListing"
                />
              </div>
      
              {/* NFT Contract Address Field */}
              <input
                type="text"
                name="contractAddress"
                placeholder="NFT Contract Address"
              />
      
              {/* NFT Token ID Field */}
              <input type="text" name="tokenId" placeholder="NFT Token ID" />
      
              {/* Sale Price For Listing Field */}
              <input type="text" name="price" placeholder="Sale Price" />
      
              <button type="submit">Create Listing</button>
            </div>
          </div>
        </form>
        </div>
      );
}

export default Create;

