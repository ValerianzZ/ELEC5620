// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Invalid request method" });

  const {
    body: { name, description, image },
  } = req.query;

  console.log("body")

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.WALLET_PRIVATE_KEY,
      ethers.getDefaultProvider("https://goerli.infura.io/v3/")
    )
  );

  const collection = await sdk.getNFTCollection(
    '0x7D98cf0A84669Fa5f13A4EC3070d0C0ca4060887'
  );

  const signature = await collection.signature.generate({
    metadata: {
      name,
      description,
      image,
    },
  });

  res.json(signature );
}
