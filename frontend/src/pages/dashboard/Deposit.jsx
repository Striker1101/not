import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import SelectInput from "../../components/vendor/form/SelectInput";
import TextInput from "../../components/vendor/form/TextInput";
import FileInput from "../../components/vendor/form/FileInput";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import Alert from "../../components/vendor/alert/Alert";
import Spinner from "../../components/Spinner";
import DataTable from "./comp/DataTable";
import api from "../../api/config";
import { useAppState } from "../../AppStateContext";
import { defaults } from "../../config/defaults";

const getAssetSymbol = (content) => {
  if (!content) return "";
  if (content.includes("ETH")) return "ETH";
  if (content.includes("BTC")) return "BTC";
  if (content.includes("USDT")) return "USDT";
  return "COIN";
};

export default function Deposit() {
  const { islogged } = useAppState();
  const [formData, setFormData] = useState({
    wallet: "",
    amount: "",
    file: [],
  });
  const refInput = useRef(null);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [result, setResult] = useState({ status: 0, message: null });
  const [method, setMethod] = useState("direct"); // direct or linked
  const [userWallets, setUserWallets] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isQRElarged, setIsQRElarged] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsQRElarged(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const activeWallets = userWallets.filter(w => !w.deleted_at);
  const hasWallet = activeWallets.length > 0;

  const fetchDeposits = async () => {
    try {
      const response = await api.get("/deposits");
      if (response.data.status === 200) {
        setDeposits(response.data.data.regions);
      }
    } catch (error) {
      console.error("Failed to fetch deposits", error);
    } finally {
      setFetching(false);
    }
  };

  const fetchUserWallets = async () => {
    try {
      const response = await api.get("/wallets/user");
      if (response.data.status === 200) {
        setUserWallets(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user wallets", error);
    }
  };

  useEffect(() => {
    fetchDeposits();
    fetchUserWallets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = () => {
    if (refInput.current?.files) {
      setFormData((prev) => ({ ...prev, file: refInput.current.files }));
    }
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setResult({ status: 200, message: "Address copied to clipboard!" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append("wallet", formData.wallet);
    data.append("amount", formData.amount);
    data.append("method", method);
    
    if (method === "direct" && formData.file) {
      for (let i = 0; i < formData.file.length; i++) {
        data.append("file", formData.file[i]);
      }
    }

    try {
      const response = await api.post("/deposits/add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(response.data);
      if (response.data.status === 200) {
        setFormData({ wallet: "", amount: "", file: [] });
        setSelectedAsset(null);
        if (refInput.current) refInput.current.value = "";
        fetchDeposits();
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Deposit submission failed." });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <Container title="Fund Account">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Main Deposit Interface */}
        <div className="space-y-12 transition-all">
          
          {/* Method Switcher */}
          <div className="flex justify-center">
            <div className="flex p-1.5 bg-white/5 rounded-[2rem] w-fit border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                <div 
                  className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-blue-600 rounded-[1.5rem] transition-all duration-300 ease-out shadow-lg shadow-blue-500/20 ${method === "linked" ? "translate-x-full" : "translate-x-0"}`}
                />
                <button 
                  onClick={() => {
                    setMethod("direct");
                    setFormData(prev => ({ ...prev, wallet: "" }));
                    setSelectedAsset(null);
                  }}
                  className={`relative z-10 px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 w-48 ${method === "direct" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    Direct Transfer
                </button>
                <button 
                  onClick={() => {
                    setMethod("linked");
                    setFormData(prev => ({ ...prev, wallet: "" }));
                    setSelectedAsset(null);
                  }}
                  className={`relative z-10 px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 w-48 ${method === "linked" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    Linked Account
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Form Side */}
            <div className="glass-card rounded-[3rem] p-10 border-white/5 space-y-8 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] rounded-full -mr-16 -mt-16"></div>

               {method === "linked" && !hasWallet ? (
                 /* Nested Unlinked State for Linked Tab */
                 <div className="text-center space-y-6 animate-fade-in py-8">
                    <div className="mx-auto w-20 h-20 bg-amber-500/10 rounded-[2rem] flex items-center justify-center text-amber-500">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Bridge Not Verified</h3>
                      <p className="text-sm text-gray-500 font-medium px-4">
                        Linked transfers require a verified decentralized signature. Connect your wallet to enable automated bridge requests.
                      </p>
                    </div>
                    <Link 
                      to="/dashboard/terms" 
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:scale-105 transition-all text-[10px]"
                    >
                      Verify Account
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                 </div>
               ) : (
                 <>
                    <div className="space-y-2 pb-6 border-b border-white/5">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                            {method === "direct" ? "Manual Funding" : "Bridge Funding"}
                        </h2>
                        <p className="text-gray-500 font-medium">
                            {method === "direct" ? "Deposit via external blockchain transfer." : "Fund directly from your verified source."}
                        </p>
                    </div>

                    <Alert result={result} setResult={setResult} timer={5000} />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {method === "direct" ? (
                          <>
                            <div className="relative w-full" ref={dropdownRef}>
                              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 px-2">
                                Select Platform Asset <span className="text-red-500">*</span>
                              </label>
                              <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border-2 border-white/5 hover:border-white/10 transition-all duration-200 outline-none flex items-center justify-between text-left cursor-pointer text-white font-medium"
                              >
                                {selectedAsset ? (
                                  <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[9px] font-black tracking-wider flex-shrink-0">
                                      {getAssetSymbol(selectedAsset.content)}
                                    </div>
                                    <div>
                                      <span className="font-bold">{selectedAsset.content}</span>
                                      <span className="ml-2 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {selectedAsset.asset}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">Select Platform Asset</span>
                                )}
                                <svg
                                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                    isDropdownOpen ? "rotate-180" : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>

                              {isDropdownOpen && (
                                <div className="absolute left-0 right-0 mt-2 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in max-h-60 overflow-y-auto">
                                  {defaults.walletOptions.map((opt, index) => (
                                    <div
                                      key={index}
                                      onClick={() => {
                                        setSelectedAsset(opt);
                                        setFormData((prev) => ({ ...prev, wallet: opt.value }));
                                        setIsDropdownOpen(false);
                                      }}
                                      className="px-5 py-3 hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors duration-150 border-b border-white/[0.02] last:border-b-0"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-black tracking-wider flex-shrink-0">
                                          {getAssetSymbol(opt.content)}
                                        </div>
                                        <span className="font-semibold text-white text-sm">{opt.content}</span>
                                      </div>
                                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {opt.asset}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {selectedAsset && (
                              <div className="p-6 bg-gradient-to-br from-blue-500/[0.05] to-transparent bg-white/5 rounded-[2rem] border border-blue-500/15 space-y-6 animate-slide-up relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.02] blur-2xl rounded-full"></div>
                                
                                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-black tracking-wider shadow-lg flex-shrink-0">
                                    {getAssetSymbol(selectedAsset.content)}
                                  </div>
                                  <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Platform Asset</p>
                                    <h4 className="text-base font-black text-white">{selectedAsset.content}</h4>
                                    <span className="inline-block text-[9px] font-mono uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md mt-1">
                                      Network ID: {selectedAsset.asset}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block text-center sm:text-left">Deposit QR Code & Address</span>
                                  
                                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                                    {/* QR Code Container */}
                                    <div className="relative group cursor-pointer p-3 bg-white rounded-3xl shadow-inner border border-white/10 flex-shrink-0" onClick={() => setIsQRElarged(true)}>
                                      <img 
                                        src={selectedAsset.image} 
                                        alt="Platform Deposit QR Code"
                                        className="w-32 h-32 object-contain"
                                      />
                                      <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                        </svg>
                                      </div>
                                    </div>
                                    
                                    {/* Address copy */}
                                    <div className="flex-1 w-full space-y-2">
                                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Platform Receiver Address</span>
                                      <div className="flex items-center justify-between gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
                                          <code className="text-xs font-mono text-gray-300 break-all leading-relaxed select-all">{formData.wallet}</code>
                                          <button 
                                            type="button"
                                            onClick={() => copyToClipboard(formData.wallet)}
                                            className="p-3 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex-shrink-0 group shadow-lg border border-blue-500/20 hover:scale-105"
                                            title="Copy Address"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                          </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Select Linked Source</label>
                            <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                              {activeWallets.map(w => (
                                <div 
                                  key={w.id}
                                  onClick={() => {
                                      if (w.status === "verified") {
                                          setFormData(prev => ({ ...prev, wallet: w.id }))
                                      }
                                  }}
                                  className={`p-5 rounded-[1.5rem] border transition-all ${
                                      w.status !== "verified" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                  } ${
                                    formData.wallet === w.id 
                                    ? "bg-blue-600/10 border-blue-500 shadow-xl shadow-blue-500/10" 
                                    : "bg-white/5 border-white/5 hover:border-white/20"
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="font-black text-white text-sm uppercase tracking-tight">{w.wallet_details?.wallet_name || "Custom Wallet"}</p>
                                      <p className="text-[10px] text-gray-500 font-mono mt-1">{w.recovery_phrase.substring(0, 15)}...</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                                          w.status === "verified" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                          w.status === "rejected" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                          "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                      }`}>
                                          {w.status || "pending"}
                                      </span>
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.wallet === w.id ? "border-blue-500" : "border-white/20"}`}>
                                        {formData.wallet === w.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="pt-2">
                               <Link 
                                 to="/dashboard/wallet" 
                                 className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-white/20 transition-all border-dashed"
                               >
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                 Link Additional Wallet
                               </Link>
                            </div>
                          </div>
                        )}

                        <TextInput
                          handleChange={handleChange}
                          placeholder="Amount (ETH/BTC)"
                          name="amount"
                          value={formData.amount}
                          type="number"
                          required
                        />

                        {method === "direct" && (
                          <FileInput
                            handleChange={handleFileChange}
                            placeholder="Upload Payment Proof"
                            name="file"
                            refInput={refInput}
                            required
                            files={formData.file}
                          />
                        )}

                        <div className="pt-4">
                          <SubmitButton 
                            loading={loading} 
                            disabled={!formData.wallet || !formData.amount}
                            text={method === "direct" ? "SUBMIT DEPOSIT PROOF" : "PROCESS BRIDGE REQUEST"} 
                          />
                        </div>
                    </form>
                 </>
               )}
            </div>

            {/* Instruction Side */}
            <div className="space-y-8">
               <div className="glass-card rounded-[3rem] p-8 border-white/5 space-y-6 bg-gradient-to-br from-blue-600/10 to-transparent">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-black uppercase text-white">How This Works</h3>
                     <ul className="space-y-4">
                        <li className="flex gap-4 text-sm text-gray-400">
                           <span className="font-black text-blue-500">01</span>
                           Copy the platform's deposit address for your chosen asset.
                        </li>
                        <li className="flex gap-4 text-sm text-gray-400" style={{ display: method === "direct" ? "flex" : "none" }}>
                           <span className="font-black text-blue-500">02</span>
                           Send exactly the amount you specified from your external wallet.
                        </li>
                        <li className="flex gap-4 text-sm text-gray-400" style={{ display: method === "linked" ? "flex" : "none" }}>
                           <span className="font-black text-blue-500">02</span>
                           Verify your linked account balance before requesting a bridge.
                        </li>
                        <li className="flex gap-4 text-sm text-gray-400">
                           <span className="font-black text-blue-500">03</span>
                           {method === "direct" ? "Capture a screenshot of the successful transaction." : "Authorize the bridging protocol via our secured relay."}
                        </li>
                        <li className="flex gap-4 text-sm text-gray-400">
                           <span className="font-black text-blue-500">04</span>
                           Wait for admin verification (usually 5-10 mins).
                        </li>
                     </ul>
                  </div>
               </div>

               {/* History Preview */}
               <div className="space-y-4">
                  <h3 className="text-lg font-black uppercase text-white tracking-widest px-2">Deposit Records</h3>
                  <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
                     <DataTable data={deposits} />
                  </div>
               </div>
               </div>
            </div>

          </div>
        </div>
      {/* </div> */}
      {/* Enlarged QR Code Modal */}
      {isQRElarged && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl animate-fade-in" onClick={() => setIsQRElarged(false)}/>
          <div className="relative w-full max-w-sm glass-card rounded-[2.5rem] p-8 border-white/10 shadow-3xl animate-modal-in dark text-white bg-[#111827]/95 flex flex-col items-center space-y-6">
            {/* Close Button */}
            <button 
              onClick={() => setIsQRElarged(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Asset Info */}
            <div className="text-center space-y-1 pt-2">
              <h4 className="text-xl font-black text-white uppercase tracking-tight">{selectedAsset.content}</h4>
              <span className="inline-block text-[9px] font-mono uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                Network ID: {selectedAsset.asset}
              </span>
            </div>

            {/* Enlarged QR Code Image */}
            <div className="p-4 bg-white rounded-3xl shadow-inner flex items-center justify-center border border-white/10">
              <img 
                src={selectedAsset.image} 
                alt={`${selectedAsset.content} QR Code`}
                className="w-64 h-64 object-contain"
              />
            </div>

            {/* Address display/copy */}
            <div className="w-full space-y-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block text-center">Scan QR Code or Copy Address</span>
              <div className="flex items-center justify-between gap-4 p-4 bg-black/20 rounded-xl border border-white/5">
                <code className="text-xs font-mono text-gray-300 break-all leading-relaxed select-all text-left flex-1">{formData.wallet}</code>
                <button 
                  type="button"
                  onClick={() => {
                    copyToClipboard(formData.wallet);
                  }}
                  className="p-3 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex-shrink-0 group shadow-lg border border-blue-500/20 hover:scale-105"
                  title="Copy Address"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
