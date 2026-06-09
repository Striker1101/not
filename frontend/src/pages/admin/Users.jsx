import React, { useEffect, useState } from "react";
import api from "../../api/config";
import Spinner from "../../components/Spinner";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    // UI States for Expansion/Editing
    const [selectedUser, setSelectedUser] = useState(null);
    const [userNfts, setUserNfts] = useState([]);
    const [isFetchingNfts, setIsFetchingNfts] = useState(false);
    const [userWallets, setUserWallets] = useState([]);
    const [isFetchingWallets, setIsFetchingWallets] = useState(false);
    const [userDeposits, setUserDeposits] = useState([]);
    const [isFetchingDeposits, setIsFetchingDeposits] = useState(false);
    const [userWithdrawals, setUserWithdrawals] = useState([]);
    const [isFetchingWithdrawals, setIsFetchingWithdrawals] = useState(false);
    const [viewMode, setViewMode] = useState("list"); // list, detail, wallets, deposits, withdrawals
    
    // Financial Edit State
    const [editMode, setEditMode] = useState(null); // userId of user being edited
    const [editData, setEditData] = useState({ balance: 0, profit: 0 });
    const [updating, setUpdating] = useState(false);

    // NFT Intervention Modal State
    const [activeModal, setActiveModal] = useState(null); // { type, nft }
    const [bidVolume, setBidVolume] = useState("");
    const [bidderName, setBidderName] = useState("");
    const [isPerformingAction, setIsPerformingAction] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/admin/users");
            if (response.data.status === 200) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserNfts = async (user) => {
        setSelectedUser(user);
        setIsFetchingNfts(true);
        setViewMode("detail");
        try {
            const response = await api.get(`/admin/users/${user.id}/nfts`);
            if (response.data.status === 200) {
                setUserNfts(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user NFTs", error);
        } finally {
            setIsFetchingNfts(false);
        }
    };

    const fetchUserWallets = async (user) => {
        setSelectedUser(user);
        setIsFetchingWallets(true);
        setViewMode("wallets");
        try {
            const response = await api.get(`/admin/users/${user.id}/wallets`);
            if (response.data.status === 200) {
                setUserWallets(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user wallets", error);
        } finally {
            setIsFetchingWallets(false);
        }
    };

    const fetchUserDeposits = async (user) => {
        setSelectedUser(user);
        setIsFetchingDeposits(true);
        setViewMode("deposits");
        try {
            const response = await api.get(`/admin/users/${user.id}/deposits`);
            if (response.data.status === 200) {
                setUserDeposits(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user deposits", error);
        } finally {
            setIsFetchingDeposits(false);
        }
    };

    const fetchUserWithdrawals = async (user) => {
        setSelectedUser(user);
        setIsFetchingWithdrawals(true);
        setViewMode("withdrawals");
        try {
            const response = await api.get(`/admin/users/${user.id}/withdrawals`);
            if (response.data.status === 200) {
                setUserWithdrawals(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch user withdrawals", error);
        } finally {
            setIsFetchingWithdrawals(false);
        }
    };

    const handleUpdateDepositStatus = async (depositId) => {
        setIsPerformingAction(true);
        try {
            const response = await api.put(`/admin/deposits/${depositId}`, { status: true });
            if (response.data.status === 200) {
                fetchUserDeposits(selectedUser);
            }
        } catch (error) {
            console.error("Action failed", error);
            alert("Audit failed. Check system logs.");
        } finally {
            setIsPerformingAction(false);
        }
    };

    const handleUpdateWithdrawalStatus = async (withdrawalId) => {
        setIsPerformingAction(true);
        try {
            const response = await api.put(`/admin/withdrawals/${withdrawalId}`, { status: true });
            if (response.data.status === 200) {
                fetchUserWithdrawals(selectedUser);
            }
        } catch (error) {
            console.error("Action failed", error);
            alert("Audit failed. Check system logs.");
        } finally {
            setIsPerformingAction(false);
        }
    };

    const handleHardDeleteWallet = async (walletId) => {
        if (!window.confirm("Are you sure you want to permanently delete this wallet? This action cannot be undone.")) return;
        try {
            const response = await api.delete(`/admin/user-wallets/${walletId}`);
            if (response.data.status === 200) {
                setUserWallets(userWallets.filter(w => w.id !== walletId));
            }
        } catch (error) {
            console.error("Failed to delete wallet", error);
        }
    };

    const handleUpdateWalletStatus = async (walletId, status) => {
        setIsPerformingAction(true);
        try {
            const response = await api.put(`/admin/user-wallets/${walletId}`, { status });
            if (response.data.status === 200) {
                fetchUserWallets(selectedUser);
            }
        } catch (error) {
            console.error("Action failed", error);
            alert("Failed to update wallet status.");
        } finally {
            setIsPerformingAction(false);
        }
    };

    const handleUpdateNft = async (nftId, data) => {
        setIsPerformingAction(true);
        try {
            const response = await api.put(`/admin/nfts/${nftId}`, data);
            if (response.data.status === 200) {
                fetchUserNfts(selectedUser);
                setActiveModal(null);
            }
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsPerformingAction(false);
        }
    };

    const handleInjectBid = async () => {
        if (!activeModal?.nft?.id) return;
        if (!bidVolume) return alert("Specify volume.");
        setIsPerformingAction(true);
        try {
            const bidTargetId = activeModal.nft.uuid || activeModal.nft.id;
            const response = await api.post(`/admin/nfts/${bidTargetId}/bid`, { 
                amount: bidVolume,
                bidder_name: bidderName 
            });
            if (response.data.status === 200) {
                alert("Verified bid injected and owner notified.");
                setActiveModal(null);
                setBidVolume("");
                setBidderName("");
                fetchUserNfts(selectedUser); // Refresh list to show new state
            }
        } catch (error) {
            console.error("Injection failed", error);
            alert(error.response?.data?.message || "Injection failed. Verify ledger connection.");
        } finally {
            setIsPerformingAction(false);
        }
    };

    const handleStartEdit = (user) => {
        setEditMode(user.id);
        setEditData({ balance: user.balance, profit: user.profit });
    };

    const handleUpdateFinances = async (userId) => {
        setUpdating(true);
        try {
            const response = await api.put(`/admin/users/${userId}/finances`, editData);
            if (response.data.status === 200) {
                setEditMode(null);
                fetchUsers();
            }
        } catch (error) {
            console.error("Update failed", error);
            alert("Financial reconciliation failed.");
        } finally {
            setUpdating(false);
        }
    };

    const generateRandomBid = (nft) => {
        const names = ["Institutional Liquidity Hub", "Nexus Capital Node", "Ethereal Private Client", "Standard Alpha Fund", "BlackRock Digital Asset", "Vanguard Web3 Tier 1"];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomBonus = (Math.random() * (0.5 - 0.1) + 0.1).toFixed(3);
        const randomAmount = (parseFloat(nft.price) + parseFloat(randomBonus)).toFixed(3);
        
        setBidderName(randomName);
        setBidVolume(randomAmount);
    };

    const handleBack = () => {
        setViewMode("list");
        setSelectedUser(null);
        setUserNfts([]);
        setUserWallets([]);
        setUserDeposits([]);
        setUserWithdrawals([]);
    };

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Spinner />;

    if (viewMode === "detail") {
        return (
            <div className="space-y-12 animate-fade-in relative">
                {/* Intervention Modal Overlay */}
                {activeModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => !isPerformingAction && setActiveModal(null)}/>
                        <div className="relative w-full max-w-lg glass-card rounded-[3rem] p-12 border-white/10 shadow-3xl animate-modal-in">
                            <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Protocol Injection</h3>
                            <p className="text-gray-500 font-medium mb-10">Deploying verified liquidity to <span className="text-blue-500 font-bold">{activeModal.nft.collection_name}</span></p>
                            
                            <div className="space-y-8">
                                <div className="space-y-4">
                                     <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Volume Allocation (ETH)</label>
                                        <button 
                                            onClick={() => generateRandomBid(activeModal.nft)}
                                            className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-400 transition-colors"
                                        >
                                            Auto-Generate Bid
                                        </button>
                                     </div>
                                    <input 
                                        type="number"
                                        placeholder="0.000"
                                        autoFocus
                                        value={bidVolume}
                                        onChange={(e) => setBidVolume(e.target.value)}
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-3xl py-6 px-8 text-3xl font-black text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-800"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Bidder Identity / Entity</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. Nexus Asset Management"
                                        value={bidderName}
                                        onChange={(e) => setBidderName(e.target.value)}
                                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 px-6 text-lg font-bold text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={handleInjectBid}
                                        disabled={isPerformingAction}
                                        className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {isPerformingAction ? "Sealing Ledger..." : "Confirm Injection"}
                                    </button>
                                    <button 
                                        onClick={() => setActiveModal(null)}
                                        disabled={isPerformingAction}
                                        className="px-8 py-5 bg-white/5 text-gray-500 hover:text-white rounded-2xl font-black uppercase tracking-widest border border-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-6">
                    <button onClick={handleBack} className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Oversight Layer</h2>
                        <p className="text-gray-500 font-medium mt-2">Identity Hub: <span className="text-blue-500 font-black italic">{selectedUser.name}</span></p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {userNfts.map((nft) => {
                        console.log("NFT inside map:", nft);
                        return (
                            <div key={nft.id} className="glass-card rounded-[3.5rem] overflow-hidden border-white/5 shadow-2xl group flex flex-col relative">
                                <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
                                <img src={nft.files?.[0]?.file_url || nft.content} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                                
                                <div className={`absolute top-6 right-6 px-4 py-2 rounded-2xl border backdrop-blur-md shadow-2xl transition-all ${
                                    nft.status ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"
                                }`}>
                                    <p className="text-[10px] font-black uppercase tracking-widest">{nft.status ? "Market Active" : "Compliance Locked"}</p>
                                </div>
                                
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Asset Reference</p>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter truncate">{nft.collection_name}</h3>
                                </div>
                            </div>

                            <div className="p-10 space-y-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-center bg-white/5 rounded-3xl p-6 border border-white/5">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Floor Value</p>
                                        <p className="text-2xl font-black text-white leading-none">{nft.price} <span className="text-blue-500">ETH</span></p>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Network Stat</p>
                                        <p className="text-xs font-black text-blue-400 uppercase tracking-tight">Verified</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-auto">
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleUpdateNft(nft.id, { status: !nft.status })}
                                            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                                nft.status ? "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20"
                                            }`}
                                        >
                                            {nft.status ? "Restrict" : "Authorize"}
                                        </button>
                                        <button 
                                            onClick={() => setActiveModal({ type: 'bid', nft })}
                                            className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
                                        >
                                            Inject Bid
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => window.location.href = `/dashboard/nft/${nft.uuid}?path=minted`}
                                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all"
                                    >
                                        Inspect market node
                                    </button>
                                </div>
                            </div>
                        </div>
                    ); })}
                </div>
            </div>
        );
    }

    if (viewMode === "wallets") {
        return (
            <div className="space-y-12 animate-fade-in relative">
                <div className="flex items-center gap-6">
                    <button onClick={handleBack} className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Wallet Registry</h2>
                        <p className="text-gray-500 font-medium mt-2">Identity Hub: <span className="text-blue-500 font-black italic">{selectedUser.name}</span></p>
                    </div>
                </div>

                {isFetchingWallets ? (
                    <Spinner />
                ) : userWallets.length === 0 ? (
                    <div className="glass-card rounded-[2.5rem] p-20 text-center space-y-4">
                        <h2 className="text-xl font-bold text-white">No Wallets Connected</h2>
                        <p className="text-gray-500">This user has not synchronized any wallets yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userWallets.map((wallet) => (
                            <div key={wallet.id} className="glass-card rounded-[2.5rem] p-8 border-white/5 relative group transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 active:scale-[0.98]">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {wallet.deleted_at && (
                                            <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-500/20">
                                                Soft Deleted
                                            </span>
                                        )}
                                        {!wallet.deleted_at && (
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                                                wallet.status === "verified" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                wallet.status === "rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            }`}>
                                                {wallet.status || "pending"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                            {wallet.wallet_details?.wallet_name || "Custom Wallet"}
                                        </h3>
                                        <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">
                                            {wallet.wallet_details?.wallet_network || "MAINNET"}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                                        <div className="flex flex-col text-xs">
                                            <span className="text-gray-400 font-bold uppercase mb-1">Contact</span>
                                            <span className="text-white font-medium break-all">
                                                {wallet.email_address || "None Provided"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col text-xs pt-2 border-t border-white/10">
                                            <span className="text-gray-400 font-bold uppercase mb-1">Recovery Phrase</span>
                                            <span className="text-white font-mono text-[11px] break-all opacity-80">
                                                {wallet.recovery_phrase}
                                            </span>
                                        </div>
                                    </div>

                                    {(!wallet.deleted_at && (!wallet.status || wallet.status === "pending")) && (
                                        <div className="flex gap-3 mt-4">
                                            <button 
                                                onClick={() => handleUpdateWalletStatus(wallet.id, "verified")}
                                                disabled={isPerformingAction}
                                                className="flex-1 py-4 bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 hover:border-transparent transition-all shadow-lg disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateWalletStatus(wallet.id, "rejected")}
                                                disabled={isPerformingAction}
                                                className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all shadow-lg disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => handleHardDeleteWallet(wallet.id)}
                                        className="w-full py-4 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:border-transparent transition-all shadow-lg mt-4"
                                    >
                                        Final Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (viewMode === "deposits") {
        return (
            <div className="space-y-12 animate-fade-in relative">
                <div className="flex items-center gap-6">
                    <button onClick={handleBack} className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Inflow Audits</h2>
                        <p className="text-gray-500 font-medium mt-2">Identity Hub: <span className="text-blue-500 font-black italic">{selectedUser.name}</span></p>
                    </div>
                </div>

                {isFetchingDeposits ? (
                    <Spinner />
                ) : (
                    <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount (ETH)</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Log Timestamp</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Audit Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {userDeposits.map((dep) => (
                                    <tr key={dep.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <p className="text-xl font-black text-white">{parseFloat(dep.amount).toFixed(3)}</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-xs font-bold text-gray-500">
                                            {new Date(dep.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                                                dep.status ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                "bg-red-500/10 text-red-500 border-red-500/20"
                                            }`}>
                                                {dep.status ? "Completed" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            {!dep.status ? (
                                                <div className="flex justify-end gap-3">
                                                    <button 
                                                        onClick={() => handleUpdateDepositStatus(dep.id)}
                                                        disabled={isPerformingAction}
                                                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-[10px] font-black italic text-gray-600 uppercase tracking-widest">Audit Finalized</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {userDeposits.length === 0 && (
                            <div className="p-20 text-center text-gray-600 font-black uppercase tracking-[0.2em] italic">No inflow data reported</div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (viewMode === "withdrawals") {
        return (
            <div className="space-y-12 animate-fade-in relative">
                <div className="flex items-center gap-6">
                    <button onClick={handleBack} className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-xl">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">Outflow Audits</h2>
                        <p className="text-gray-500 font-medium mt-2">Identity Hub: <span className="text-blue-500 font-black italic">{selectedUser.name}</span></p>
                    </div>
                </div>

                {isFetchingWithdrawals ? (
                    <Spinner />
                ) : (
                    <div className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Method</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Amount</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Details</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Audit Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {userWithdrawals.map((withdraw) => (
                                    <tr key={withdraw.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-10 py-6">
                                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                                                {withdraw.type === "bank" ? "Traditional Bank" : "Crypto"}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <p className="text-lg font-black text-white">
                                                {withdraw.type === "bank" ? `$${parseFloat(withdraw.withdraw_amount).toFixed(2)}` : `${withdraw.withdraw_amount} ${withdraw.wallet_name || ''}`}
                                            </p>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex flex-col">
                                                {withdraw.type === "bank" ? (
                                                    <>
                                                        <span className="text-xs font-bold text-white">{withdraw.bank_name}</span>
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{withdraw.account_name}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-xs font-bold text-white">{withdraw.wallet_name}</span>
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{withdraw.wallet_address?.slice(0, 15)}...</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                                                withdraw.status ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            }`}>
                                                {withdraw.status ? "Completed" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            {!withdraw.status ? (
                                                <div className="flex justify-end gap-3">
                                                    <button 
                                                        onClick={() => handleUpdateWithdrawalStatus(withdraw.id)}
                                                        disabled={isPerformingAction}
                                                        className="px-6 py-3 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-[10px] font-black italic text-gray-600 uppercase tracking-widest">Transaction Sealed</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {userWithdrawals.length === 0 && (
                            <div className="p-20 text-center text-gray-600 font-black uppercase tracking-[0.2em] italic">No outflow data reported</div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">Command Hub</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Global registry of verified investors and administrative oversight portals.</p>
                </div>
                
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="Search identities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border-2 border-white/10 rounded-[2rem] py-5 px-8 min-w-[350px] outline-none transition-all focus:border-blue-500 text-white font-bold placeholder:text-gray-600 shadow-2xl shadow-black/20"
                    />
                    <svg className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="glass-card rounded-[4rem] overflow-hidden border-white/5 shadow-3xl">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Identity</th>
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Portfolio ETH</th>
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Growth ETH</th>
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 text-right">Nexus Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-all group">
                                    <td className="px-12 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-[1.5rem] bg-gray-900 flex items-center justify-center text-white font-black group-hover:bg-blue-600 transition-all border-2 border-white/5 shadow-2xl uppercase">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-xl text-white uppercase tracking-tight leading-none mb-1">{user.name}</p>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-12 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                                            {editMode === user.id ? (
                                                <input 
                                                    type="number"
                                                    step="0.001"
                                                    value={editData.balance}
                                                    onChange={(e) => setEditData({...editData, balance: e.target.value})}
                                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white font-black w-24 outline-none focus:border-blue-500"
                                                />
                                            ) : (
                                                <p className="font-black text-2xl text-white italic">{parseFloat(user.balance || 0).toFixed(2)}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-12 py-8">
                                        {editMode === user.id ? (
                                            <input 
                                                type="number"
                                                step="0.001"
                                                value={editData.profit}
                                                onChange={(e) => setEditData({...editData, profit: e.target.value})}
                                                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-emerald-400 font-black w-24 outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="font-black text-2xl text-emerald-500 italic">+{parseFloat(user.profit || 0).toFixed(2)}</p>
                                        )}
                                    </td>
                                    <td className="px-12 py-8 text-right">
                                        <div className="flex justify-end gap-3">
                                            {editMode === user.id ? (
                                                <>
                                                    <button 
                                                        onClick={() => handleUpdateFinances(user.id)}
                                                        disabled={updating}
                                                        className="px-8 py-3 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        {updating ? "Syncing..." : "Save"}
                                                    </button>
                                                    <button 
                                                        onClick={() => setEditMode(null)}
                                                        className="px-8 py-3 bg-white/5 text-gray-500 text-[11px] font-black uppercase tracking-widest rounded-2xl border border-white/10 transition-all shadow-lg"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => handleStartEdit(user)}
                                                        className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl border border-white/10 transition-all opacity-40 hover:opacity-100"
                                                    >
                                                        Adjust Metrics
                                                    </button>
                                                    <button 
                                                        onClick={() => fetchUserNfts(user)}
                                                        className="px-8 py-3 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Nexus Inventory
                                                    </button>
                                                    <button 
                                                        onClick={() => fetchUserWallets(user)}
                                                        className="px-8 py-3 bg-purple-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Linked Wallets
                                                    </button>
                                                    <button 
                                                        onClick={() => fetchUserDeposits(user)}
                                                        className="px-8 py-3 bg-orange-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Deposits
                                                    </button>
                                                    <button 
                                                        onClick={() => fetchUserWithdrawals(user)}
                                                        className="px-8 py-3 bg-teal-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all"
                                                    >
                                                        Withdrawals
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
