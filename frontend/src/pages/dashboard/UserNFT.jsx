import React, { useEffect, useState } from "react";
import NFTS from "./comp/NFTS";
import { useAppState } from "../../AppStateContext";
import api from "../../api/config";
import Spinner from "../../components/Spinner";

export default function UserNFT() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyNFTs = async () => {
        try {
            const response = await api.get("/nfts");
            if (response.data.status === 200) {
                setNfts(response.data.data.regions);
            }
        } catch (error) {
            console.error("Failed to fetch personal NFTs", error);
        } finally {
            setLoading(false);
        }
    };
    fetchMyNFTs();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <NFTS
      datas={nfts}
      placeholder={"Search By Product Name"}
      card_holder={"Current Bid"}
      title={"Users NFT"}
      path="user_nft"
    />
  );
}
