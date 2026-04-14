import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SelectInput from "../../components/vendor/form/SelectInput";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import Alert from "../../components/vendor/alert/Alert";
import Spinner from "../../components/Spinner";
import DataTable from "./comp/DataTable";
import api from "../../api/config";
import { useAppState } from "../../AppStateContext";

export default function Withdraw() {
  const { islogged } = useAppState();
  const [method, setMethod] = useState("bank"); // bank or crypto
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [withdraws, setWithdraws] = useState([]);
  const [result, setResult] = useState({ status: 0, message: null });

  const [formData, setFormData] = useState({
    account_name: "",
    bank_name: "",
    swift_code: "",
    bank_address: "",
    wallet_name: "",
    wallet_address: "",
    email: islogged.userData?.email || "",
    withdraw_amount: "",
    additional_info: "",
  });

  const fetchWithdrawals = async () => {
    try {
      const response = await api.get("/withdraws");
      if (response.data.status === 200) {
        setWithdraws(response.data.data.regions);
      }
    } catch (error) {
      console.error("Failed to fetch withdrawals", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.withdraw_amount) > parseFloat(islogged.userData?.balance || 0)) {
        setResult({ status: 400, message: "Insufficient balance for this withdrawal." });
        return;
    }

    setLoading(true);
    try {
      const payload = { ...formData, type: method };
      const response = await api.post("/withdraws/add", payload);
      setResult(response.data);
      if (response.data.status === 200) {
        setFormData({
            ...formData,
            account_name: "", bank_name: "", swift_code: "", bank_address: "",
            wallet_name: "", wallet_address: "", withdraw_amount: "", additional_info: "",
        });
        fetchWithdrawals();
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Withdrawal request failed." });
    } finally {
      setLoading(false);
    }
  };

  const cryptoOptions = [
    { content: "Ethereum (ETH)", value: "ETH" },
    { content: "Bitcoin (BTC)", value: "BTC" },
    { content: "USDT (ERC20)", value: "USDT" },
    { content: "Solana (SOL)", value: "SOL" },
  ];

  if (fetching) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <Container title="Withdraw Funds">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-fade-in">
        
        {/* Balance Display */}
        <div className="glass-card rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-emerald-500/10 shadow-2xl shadow-emerald-500/5 bg-gradient-to-br from-emerald-500/[0.03] to-transparent">
           <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] block">Available Liquidity</span>
              <h2 className="text-6xl font-black text-white tracking-tighter">
                {parseFloat(islogged.userData?.balance || 0).toFixed(4)} <span className="text-emerald-500 text-2xl uppercase italic">ETH</span>
              </h2>
              <p className="text-gray-500 font-medium">Your global vault balance ready for extraction.</p>
           </div>
           <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
        </div>

        {/* Method Switcher */}
        <div className="flex justify-center">
            <div className="flex p-1.5 bg-white/5 rounded-[2rem] w-fit border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                <div 
                  className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-blue-600 rounded-[1.5rem] transition-all duration-300 ease-out shadow-lg shadow-blue-500/20 ${method === "crypto" ? "translate-x-full" : "translate-x-0"}`}
                />
                <button 
                  onClick={() => setMethod("bank")}
                  className={`relative z-10 px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 w-48 ${method === "bank" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    Traditional Bank
                </button>
                <button 
                  onClick={() => setMethod("crypto")}
                  className={`relative z-10 px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 w-48 ${method === "crypto" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                    Crypto Payout
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
           
           {/* Form Panel */}
           <div className="glass-card rounded-[3rem] p-10 border-white/5 space-y-8 shadow-2xl">
              <div className="space-y-2 pb-6 border-b border-white/5">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Extraction Request</h2>
                <p className="text-gray-400 font-medium">Verify your destination details before submitting.</p>
              </div>

              <Alert result={result} setResult={setResult} timer={5000} />

              <form onSubmit={handleSubmit} className="space-y-4">
                 {method === "bank" ? (
                   <>
                     <TextInput handleChange={handleChange} placeholder="Account Name" name="account_name" value={formData.account_name} required />
                     <TextInput handleChange={handleChange} placeholder="Bank Name" name="bank_name" value={formData.bank_name} required />
                     <div className="grid grid-cols-2 gap-4">
                        <TextInput handleChange={handleChange} placeholder="Swift Code" name="swift_code" value={formData.swift_code} required />
                        <TextInput handleChange={handleChange} placeholder="Amount" name="withdraw_amount" value={formData.withdraw_amount} type="number" required />
                     </div>
                     <TextInput handleChange={handleChange} placeholder="Bank Address" name="bank_address" value={formData.bank_address} required />
                   </>
                 ) : (
                   <>
                     <SelectInput handleChange={handleChange} placeholder="Asset Type" name="wallet_name" value={formData.wallet_name} options={cryptoOptions} required />
                     <TextInput handleChange={handleChange} placeholder="Destination Address" name="wallet_address" value={formData.wallet_address} required />
                     <TextInput handleChange={handleChange} placeholder="Extraction Amount" name="withdraw_amount" value={formData.withdraw_amount} type="number" required />
                   </>
                 )}
                 <TextArea handleChange={handleChange} placeholder="Additional Reference / Memo" name="additional_info" value={formData.additional_info} />
                 
                 <div className="pt-4">
                    <SubmitButton loading={loading} text={method === "bank" ? "INITIATE BANK WIRE" : "EXECUTE CRYPTO PAYOUT"} />
                 </div>
              </form>
           </div>

           {/* Security & History Side */}
           <div className="space-y-8">
              <div className="glass-card rounded-[3rem] p-8 border-amber-500/10 space-y-6 bg-gradient-to-br from-amber-500/[0.03] to-transparent">
                 <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase text-white tracking-widest">Protocol Safety</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      All extractions undergo a multi-signature verification process. Ensure destination details are correct; reversed transfers are not possible once processed.
                    </p>
                 </div>
              </div>

              <div className="space-y-4">
                  <h3 className="text-lg font-black uppercase text-white tracking-widest px-2">Extraction Logs</h3>
                  <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
                     <DataTable data={withdraws} />
                  </div>
              </div>
           </div>
        </div>

      </div>
    </Container>
  );
}
