import { useState, useEffect } from "react";
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

  const [nft, setNft] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [result, setResult] = useState({ status: 0, message: null });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const currentUser = islogged.userData?.users?.[0];
  const recommendations = randomSelector([...minted, ...buy], 4);

  useEffect(() => {
    fetchNftDetail();
  }, [id]);

  useEffect(() => {
    if (nft?.id) {
        fetchBids();
    }
  }, [nft]);

  // Countdown logic
  useEffect(() => {
    if (!nft?.ends_at) return;

    const timer = setInterval(() => {
      const distance = new Date(nft.ends_at).getTime() - new Date().getTime();
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("AUCTION ENDED");
        return;
      }

      const h = Math.floor(distance / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${h}h : ${m < 10 ? "0" + m : m}m : ${s < 10 ? "0" + s : s}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [nft?.ends_at]);

  const fetchNftDetail = async () => {
    setIsFetching(true);
    try {
      const response = await api.get(`/nfts/${id}`);
      if (response.data.status === 200) {
        setNft(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch NFT detail", error);
      // Fallback to mock data if it's a mock asset
      const mockResult = [...minted, ...buy].find(item => (item.id || item.uuid) == id);
      if (mockResult) setNft(mockResult);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await api.get(`/bids/nft/${nft.id}`);
      if (response.data.status === 200) {
        setBids(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bids", error);
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || (nft.price && parseFloat(bidAmount) <= parseFloat(nft.price))) {
        setResult({ status: 400, message: "Bid must be higher than current floor price." });
        return;
    }
    setLoading(true);
    try {
        const response = await api.post("/bids/place", {
            nft_id: nft.id || nft.uuid,
            amount: bidAmount,
            collection_name: nft.collection_name || nft.creator,
            creator: nft.creator,
            price: nft.price,
            image_url: nft.fileUrls?.[0] || nft.content
        });
        setResult(response.data);
        if (response.data.status === 200) {
            setBidAmount("");
            fetchBids();
        }
    } catch (error) {
        setResult({ status: 400, message: error.response?.data?.message || "Failed to place bid." });
    } finally {
        setLoading(false);
    }
  };

  const handleAcceptBid = async (bidId) => {
    if (!window.confirm("Are you sure you want to accept this bid? This will finalize the offer.")) return;
    setActionLoading(true);
    try {
        const response = await api.post(`/bids/accept/${bidId}`);
        setResult(response.data);
        if (response.data.status === 200) {
            fetchBids();
        }
    } catch (error) {
        setResult({ status: 400, message: error.response?.data?.message || "Failed to accept bid." });
    } finally {
        setActionLoading(false);
    }
  };

  const handleExtendTime = async () => {
    const hours = prompt("How many hours to add?", "24");
    if (!hours || isNaN(hours)) return;
    
    try {
        const response = await api.put(`/nfts/extend-time/${nft.uuid}`, { hours: parseInt(hours) });
        if (response.data.status === 200) {
            setResult({ status: 200, message: response.data.message });
            setNft({ ...nft, ends_at: response.data.ends_at });
        }
    } catch (error) {
        setResult({ status: 400, message: "Failed to extend time. Admins only." });
    }
  };

  if (isFetching) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  if (!nft) return <div className="h-screen flex items-center justify-center text-white font-black uppercase tracking-widest italic opacity-50">Discovery Terminated: Asset Not Found</div>;

  const isOwner = currentUser && (nft.user_id === currentUser.id || nft.creator === currentUser.name);
  const isAdmin = currentUser?.role === "admin";

  return (
    <Container title={nft.collection_name || "Asset Details"}>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        
        {/* Detail Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Main Display */}
          <div className="space-y-6">
            <div className="glass-card rounded-[3rem] p-6 shadow-2xl border-white/5 overflow-hidden group">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white/5">
                {nft.type === "image" || !nft.type ? (
                   <img 
                    src={nft.fileUrls?.[0] || nft.content} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt={nft.collection_name} 
                   />
                ) : (
                   <video src={nft.content} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                )}
                <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                   <span className="text-xs font-black text-white uppercase tracking-widest">{nft.category || "LEGENDARY"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] font-mono">Verified Hash</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none break-words">
                {nft.collection_name || "Quantum Shard"}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                {nft.des || "An ethereal masterpiece captured from the deep layers of the blockchain. Part of a limited-edition descent into digital abstraction."}
              </p>
            </div>

            {/* Price & Bid Card */}
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6 border-white/5 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
               {isOwner && (
                 <div className="absolute top-0 right-0 px-4 py-1 bg-blue-600 text-[10px] font-black uppercase text-white tracking-widest rounded-bl-xl">
                   Property of Self
                 </div>
               )}
               <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Floor Reservation</span>
                    <p className="text-4xl font-black text-gray-900 dark:text-white mt-1">{nft.price} <span className="text-blue-500 text-xl italic uppercase">ETH</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50">Auction Pulse</span>
                    <p className="text-xl font-black text-emerald-400 mt-1 uppercase font-mono tracking-wider">
                        {timeLeft || "AUCTION ENDED"}
                    </p>
                  </div>
               </div>

               {isOwner ? (
                 <div className="space-y-4 pt-2">
                    <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl">
                        <p className="text-blue-400 text-xs font-bold leading-relaxed">
                            You are the master of this asset. You can review open offers from the market below. 15% marketplace commission applies on acceptance.
                        </p>
                    </div>
                    {isAdmin && (
                        <button 
                            onClick={handleExtendTime}
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-black tracking-widest border border-white/10 transition-all uppercase"
                        >
                            Extend Auction Duration (Admin)
                        </button>
                    )}
                 </div>
               ) : (
                 <form onSubmit={handlePlaceBid} className="space-y-4 pt-2">
                    <Alert result={result} setResult={setResult} timer={5000} />
                    <div className="relative group">
                        <input 
                        type="number" 
                        step="0.0001"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={`Min Bid ${parseFloat(nft.price) + 0.01} ETH`}
                        className="w-full bg-black/5 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 dark:text-white font-bold placeholder:text-gray-400"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">ETH</div>
                    </div>
                    <button 
                        disabled={loading || timeLeft === "AUCTION ENDED"}
                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                    >
                        {loading ? "PROCESSING..." : timeLeft === "AUCTION ENDED" ? "AUCTION CLOSED" : "PLACE SECURE BID"}
                        {!loading && timeLeft !== "AUCTION ENDED" && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                    </button>
                 </form>
               )}
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 w-fit pr-10">
               <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-blue-600 flex items-center justify-center text-white font-black text-xl">
                  {nft.creator?.charAt(0).toUpperCase() || "B"}
               </div>
                <div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Master Artist</span>
                  <p className="text-gray-900 dark:text-white font-black uppercase tracking-tight">{nft.creator || "BlockArt Resident"}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bids Table for Owner & Public Visibility */}
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">Live Bidding History</h2>
                <div className="px-4 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {bids.length} Offers Pending
                </div>
            </div>
            
            <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Bidder</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            {isOwner && <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bids.length > 0 ? bids.map((bid, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[10px] font-black text-white border border-white/5 group-hover:border-blue-500/50 transition-colors">
                                            {bid.User?.name?.charAt(0) || "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900 dark:text-white">{bid.bidder_name || bid.User?.name || "Anonymous"}</p>
                                            <p className="text-[10px] text-gray-500 font-mono italic">{bid.User?.uid?.slice(0, 8)}...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-emerald-400 font-black">{bid.amount} <span className="text-[10px] uppercase">ETH</span></p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        bid.status === "accepted" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" :
                                        bid.status === "rejected" ? "bg-red-500/20 text-red-400 border border-red-500/20" :
                                        "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                                    }`}>
                                        {bid.status}
                                    </span>
                                </td>
                                {isOwner && (
                                    <td className="px-8 py-6 text-right">
                                        {bid.status === "pending" && (
                                            <button 
                                                onClick={() => handleAcceptBid(bid.id)}
                                                disabled={actionLoading}
                                                className="px-6 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                                            >
                                                Accept Offer
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={isOwner ? 4 : 3} className="px-8 py-20 text-center">
                                    <p className="text-gray-600 font-black uppercase text-xs tracking-widest">No Offers Reported on this Frontier</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Details & Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <DetailTile label="Protocol" value="ERC-721" />
           <DetailTile label="Blockchain" value="Ethereum Mainnet" />
           <DetailTile label="IPFS CID" value={nft.uuid?.slice(0, 12) + "..."} />
           <DetailTile label="Evaluation" value={nft.status ? "Verified" : "Pending Approval"} status={nft.status} />
        </div>

        {/* Recommendations */}
        <div className="space-y-10 pt-10">
           <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">More From This Frontier</h2>
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
    <p className={`text-lg font-black truncate uppercase tracking-tight ${status === false ? "text-amber-500" : status === true ? "text-emerald-400" : "text-gray-900 dark:text-white"}`}>
      {value}
    </p>
  </div>
);

export default NFTCard;
