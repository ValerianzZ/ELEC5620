// Data of the listing you want to create
const listing = {
  // address of the NFT contract the asset you want to list is on
  assetContractAddress: "0x...",
  // token ID of the asset you want to list
  tokenId: "0",
 // when should the listing open up for offers
  startTimestamp: new Date(),
  // how long the listing will be open for
  listingDurationInSeconds: 86400,
  // how many of the asset you want to list
  quantity: 1,
  // address of the currency contract that will be used to pay for the listing
  currencyContractAddress: NATIVE_TOKEN_ADDRESS,
  // how much the asset will be sold for
  buyoutPricePerToken: "1.5",
}

const tx = await contract.direct.createListing(listing);
const receipt = tx.receipt; // the transaction receipt
const listingId = tx.id; // the id of the newly created listing

// And on the buyers side:
// Quantity of the asset you want to buy
const quantityDesired = 1;
await contract.direct.buyoutListing(listingId, quantityDesired);