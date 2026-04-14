import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Container from "../../components/Container";
import StyledCard from "../../components/vendor/Card/StyledCard";
import Spinner from "../../components/Spinner";
import { useAppState } from "../../AppStateContext";
import { datas as minted } from "../../utility/mintedData";
import { datas as buy } from "../../utility/buyData";
import { creators } from "../../utility/homepageData";
import Alert from "../../components/vendor/alert/Alert";
import api from "../../api/config";

const NFTCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const { islogged, randomSelector } = useAppState();
  const queryParams = new URLSearchParams(location.search);
  const path = queryParams.get("path");

  const [bidAmount, setBidAmount] = useState("");
  const [result, setResult] = useState({ status: 0, message: null });
  const [loading, setLoading] = useState(false);

  let datas = [];
  if (path === "minted") datas = minted;
  else if (path === "buy") datas = buy;
  else if (path === "user_nft" && islogged.userData?.nfts?.[0]) {
    datas = islogged.userData.nfts[0].regions.map(obj => {
        if (obj.fileUrls?.length > 0) {
            return { ...obj, content: obj.fileUrls[0], type: "image", id: obj.uuid };
        }
        return { ...obj, id: obj.uuid };
    });
  }

  const card = datas.find((item) => (item.id || item.uuid) == id);
  const recommendations = randomSelector([...minted, ...buy], 4);

  if (!card) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || (card.price && parseFloat(bidAmount) <= parseFloat(card.price))) {
        setResult({ status: 400, message: "Bid must be higher than current floor price." });
        return;
    }
    setLoading(true);
    try {
        const response = await api.post("/bids/place", {
            nft_id: card.id,
            amount: bidAmount,
            // Pass extra info for mock NFTs so backend can auto-create metadata
            collection_name: card.collection_name || card.creator,
            creator: card.creator,
            price: card.price,
            image_url: card.content || (card.files?.[0]?.file_url)
        });
        setResult(response.data);
        if (response.data.status === 200) {
            setBidAmount("");
        }
    } catch (error) {
        setResult({ status: 400, message: error.response?.data?.message || "Failed to place bid." });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container title={card.collection_name || "Asset Details"}>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        
        {/* Detail Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Main Display */}
          <div className="space-y-6">
            <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-white/5 overflow-hidden group">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white/5">
                {card.type === "image" || !card.type ? (
                   <img 
                    src={card.content || card.fileUrls?.[0]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt={card.collection_name} 
                   />
                ) : (
                   <video src={card.content} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                )}
                <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                   <span className="text-xs font-black text-white uppercase tracking-widest">{card.category || "LEGENDARY"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Verified Origin</span>
              </div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                {card.collection_name || "Quantum Shard"}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                {card.des || "An ethereal masterpiece captured from the deep layers of the blockchain. Part of a limited-edition descent into digital abstraction."}
              </p>
            </div>

            {/* Price & Bid Card */}
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6 border-blue-500/10 shadow-2xl shadow-blue-500/5">
               <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Floor</span>
                    <p className="text-4xl font-black text-white mt-1">{card.price} <span className="text-blue-500 text-xl italic uppercase">ETH</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ends In</span>
                    <p className="text-xl font-black text-emerald-400 mt-1 uppercase">12h : 45m : 02s</p>
                  </div>
               </div>

               <form onSubmit={handlePlaceBid} className="space-y-4 pt-2">
                  <Alert result={result} setResult={setResult} timer={5000} />
                  <div className="relative group">
                    <input 
                       type="number" 
                       value={bidAmount}
                       onChange={(e) => setBidAmount(e.target.value)}
                       placeholder={`Min Bid ${parseFloat(card.price) + 0.01} ETH`}
                       className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-white font-bold"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">ETH</div>
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm tracking-widest flex items-center justify-center gap-3"
                  >
                    {loading ? "PROCESSING..." : "PLACE SECURE BID"}
                    {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                  </button>
               </form>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 w-fit pr-10">
               <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img src={creators[0].content} className="w-full h-full object-cover" alt="Artist" />
               </div>
               <div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Master Artist</span>
                  <p className="text-white font-black uppercase tracking-tight">{card.creator}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <DetailTile label="Protocol" value="ERC-721" />
           <DetailTile label="Blockchain" value="Ethereum Mainnet" />
           <DetailTile label="IPFS CID" value="QmX...f8zH" />
           <DetailTile label="Evaluation" value={card.status ? "Verified" : "Pending"} status={card.status} />
        </div>

        {/* Recommendations */}
        <div className="space-y-10 pt-10">
           <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">More From This Frontier</h2>
                <p className="text-gray-500 font-medium">Curated assets similar to your recent discovery.</p>
              </div>
              <Link to="/dashboard/minted" className="px-6 py-2 rounded-xl bg-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                View All
              </Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {recommendations.map((data, index) => (
                <Link key={index} to={`/dashboard/nft/${data.id || data.uuid}?path=minted`} className="w-full flex justify-center">
                   <StyledCard data={data} card_holder="Highest Bid" />
                </Link>
              ))}
           </div>
        </div>

      </div>
    </Container>
  );
};

const DetailTile = ({ label, value, status }) => (
  <div className="glass-card rounded-[2rem] p-6 border-white/5 space-y-1">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{label}</span>
    <p className={`text-lg font-black truncate uppercase tracking-tight ${status === false ? "text-amber-500" : status === true ? "text-emerald-400" : "text-white"}`}>
      {value}
    </p>
  </div>
);

export default NFTCard;
