import React from "react";

export default function NFTCard({ data }) {
  return (
    <div className="p-5 border rounded-lg flex flex-col">
      <img src={data?.media[0]?.gateway} className="" />
      <div className="mt-2">{data.title || <i>No name specified</i>}</div>
      <div className="mt-2 w-full text-ellipsis">{data.contract.address}</div>
      <div className="mt-2">Token ID: {data.tokenId}</div>
    </div>
  );
}
