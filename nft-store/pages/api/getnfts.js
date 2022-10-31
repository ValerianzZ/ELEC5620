// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Network, Alchemy } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: '54FJaAAKKiJL3EiX48IiaWO3SmL32m2j',
  network: Network.ETH_GOERLI,
});

export default async function handler(req, res) {
  try {
    if (req.method != "GET")
      return res.status(400).json({
        message: "Invalid method",
      });

    const { wallet } = req.query;

    const results = await alchemy.nft.getNftsForOwner(wallet);

    res.json({ message: "Fetch successful", data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
