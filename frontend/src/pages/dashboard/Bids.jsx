import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Alert from "../../components/vendor/alert/Alert";
import api from "../../api/config";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import Spinner from "../../components/Spinner";

export default function Bids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [result, setResult] = useState({ status: 0, message: null });

  const fetchBids = async () => {
    try {
      const response = await api.get("/bids");
      if (response.data.status === 200) {
        setBids(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bids", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  const handlePay = async (bidId) => {
    setActionLoading(bidId);
    try {
      const response = await api.post(`/bids/pay/${bidId}`);
      setResult(response.data);
      if (response.data.status === 200) {
        setBids(bids.map(b => b.id === bidId ? { ...b, status: "paid" } : b));
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Payment failed." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (bidId) => {
    if (!window.confirm("Are you sure you want to cancel this bid?")) return;
    setActionLoading(bidId);
    try {
      const response = await api.delete(`/bids/${bidId}`);
      setResult(response.data);
      if (response.data.status === 200) {
        setBids(bids.filter(b => b.id !== bidId));
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Failed to cancel bid." });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <Container title="My Bids">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black tracking-tight gradient-text uppercase">Auction Control</h1>
              <p className="text-gray-500 font-medium">Track your marketplace offers and complete acquisitions.</p>
            </div>
        </div>

        <Alert result={result} setResult={setResult} timer={5000} />

        {bids.length === 0 ? (
          <div className="glass-card rounded-[2.5rem] p-20 text-center space-y-4">
             <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h2 className="text-xl font-bold uppercase tracking-tight">No Active Bids</h2>
             <p className="text-gray-500">You haven't placed any bids on the marketplace yet.</p>
             <a href="/dashboard/minted" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Explore NFTs</a>
          </div>
        ) : (
          <div className="space-y-6">
            {bids.map((bid) => (
              <div key={bid.id} className="glass-card rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border-white/5 group transition-all hover:bg-white/[0.03]">
                
                {/* NFT Image Preview */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden flex-shrink-0 border border-white/10 shadow-2xl relative">
                   <img 
                    src={bid.image_url || bid.nft_details?.files?.[0]?.file_url || "https://via.placeholder.com/400"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="NFT" 
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all pointer-events-none"></div>
                </div>

                {/* Info Section */}
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/10">BID: #{bid.id}</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {new Date(bid.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight truncate max-w-md">
                    {bid.collection_name || bid.nft_details?.collection_name || "Nexus Shard"}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">My Offer</span>
                        <div className="flex items-baseline gap-1">
                           <span className="text-2xl font-black text-white">{bid.amount}</span>
                           <span className="text-blue-500 text-[10px] font-black italic uppercase">ETH</span>
                        </div>
                     </div>
                     <div className="w-px h-10 bg-white/5"></div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Creator</span>
                        <span className="text-sm font-bold text-gray-300">@{bid.nft_details?.creator || "Artisanal Labs"}</span>
                     </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-center md:items-end gap-4 min-w-[200px]">
                   <div className={`px-6 py-2.5 rounded-2xl border flex items-center gap-3 transition-all ${getStatusStyles(bid.status)}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${bid.status === "pending" ? "animate-pulse" : ""} ${getStatusDot(bid.status)}`}></span>
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">{bid.status}</span>
                   </div>

                   {bid.status === "pending" && (
                     <button 
                        onClick={() => handleCancel(bid.id)}
                        disabled={actionLoading === bid.id}
                        className="text-[10px] font-black text-gray-500 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2"
                     >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        CANCEL BID
                     </button>
                   )}

                   {bid.status === "accepted" && (
                     <SubmitButton 
                        loading={actionLoading === bid.id} 
                        text="COMPLETE ACQUISITION" 
                        onClick={() => handlePay(bid.id)}
                        className="w-full py-4 px-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-widest"
                     />
                   )}
                   
                   {bid.status === "paid" && (
                     <div className="flex items-center gap-2 text-emerald-500 animate-fade-in">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        <span className="text-xs font-black uppercase tracking-widest">Ownership Secured</span>
                     </div>
                   )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

function getStatusStyles(status) {
  switch (status) {
    case "pending": return "bg-amber-500/5 border-amber-500/20 text-amber-500";
    case "accepted": return "bg-blue-500/5 border-blue-500/20 text-blue-500";
    case "rejected": return "bg-red-500/5 border-red-500/20 text-red-500";
    case "paid": return "bg-emerald-500/5 border-emerald-500/20 text-emerald-500";
    default: return "bg-gray-500/5 border-gray-500/20 text-gray-500";
  }
}

function getStatusDot(status) {
  switch (status) {
    case "pending": return "bg-amber-500";
    case "accepted": return "bg-blue-500";
    case "rejected": return "bg-red-500";
    case "paid": return "bg-emerald-500";
    default: return "bg-gray-500";
  }
}
