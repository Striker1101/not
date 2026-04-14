import React, { useState } from "react";
import Container from "../../components/Container";
import { useAppState } from "../../AppStateContext";
import { Link } from "react-router-dom";
import TextInput from "../../components/vendor/form/TextInput";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import Alert from "../../components/vendor/alert/Alert";
import api from "../../api/config";

export default function Profile() {
  const { islogged } = useAppState();
  const userData = islogged.userData?.users?.[0] || {};
  const nftCount = islogged.userData?.nfts?.[0]?.regions?.length || 0;
  const walletConnected = islogged.userData?.user_wallets?.length > 0;

  const [formData, setFormData] = useState({
    username: userData.name || userData.display_name || "",
    email: userData.email || "",
    password: "",
    confirm_password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ status: 0, message: null });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirm_password) {
        setResult({ status: 400, message: "Security keys do not match. Please verify your password." });
        return;
    }

    setLoading(true);
    try {
      const response = await api.put("/users/update", formData);
      setResult(response.data);
      if (response.data.status === 200) {
        setFormData(prev => ({ ...prev, password: "", confirm_password: "" }));
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Synchronization failed." });
    } finally {
      setLoading(false);
    }
  };

  const initials = (formData.username || "UN").substring(0, 2).toUpperCase();

  return (
    <Container title="Identity Management">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-fade-in">
        
        {/* Profile Hero section */}
        <div className="glass-card rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 border-white/5 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -ml-32 -mt-32"></div>
           
           <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-all duration-500">
                {initials}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white dark:border-[#0b0f19] text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
              </div>
           </div>

           <div className="space-y-3 text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                 <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{formData.username || "Anonymous User"}</h2>
                 <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-500/20 w-fit mx-auto md:mx-0">
                    Verified Investor
                 </span>
              </div>
              <p className="text-gray-500 font-medium">Manage your digital identity and account security across the BlockArt network.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-8">
               <div className="glass-card rounded-[3rem] p-10 border-white/5 shadow-2xl space-y-8">
                  <div className="space-y-2 border-b border-white/5 pb-6">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Profile Metadata</h3>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-black opacity-50">Public Information</p>
                  </div>

                  <Alert result={result} setResult={setResult} timer={5000} />

                  <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Display Name</label>
                        <TextInput handleChange={handleChange} placeholder="Username" name="username" value={formData.username} required />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                        <TextInput handleChange={handleChange} placeholder="Email" name="email" value={formData.email} type="email" required />
                     </div>

                     <div className="md:col-span-2 space-y-6 pt-6 border-t border-white/5">
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Security & Access</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">Modify your password to ensure vault integrity. Leave blank to keep current.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="relative group">
                              <TextInput 
                                 handleChange={handleChange} 
                                 placeholder="New Vault Password" 
                                 name="password" 
                                 value={formData.password} 
                                 type={showPassword ? "text" : "password"} 
                              />
                              <button 
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-white transition-all"
                              >
                                 {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                                 ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                 )}
                              </button>
                           </div>
                           <TextInput 
                              handleChange={handleChange} 
                              placeholder="Confirm New Password" 
                              name="confirm_password" 
                              value={formData.confirm_password} 
                              type={showPassword ? "text" : "password"} 
                           />
                        </div>
                     </div>

                     <div className="md:col-span-2 pt-6">
                        <SubmitButton loading={loading} text="PERSIST CHANGES" />
                     </div>
                  </form>
               </div>
            </div>

            {/* Snapshot Cards */}
            <div className="space-y-6">
                <Link to="/dashboard/user_nft" className="block group">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6 bg-gradient-to-br from-blue-600/[0.03] to-transparent hover:border-blue-500/20 transition-all duration-500">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-black text-white uppercase tracking-tighter">Your Collection</h4>
                            <p className="text-4xl font-black text-blue-500">{nftCount} <span className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Assets</span></p>
                        </div>
                    </div>
                </Link>

                <Link to="/dashboard/wallet" className="block group">
                    <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-6 bg-gradient-to-br from-amber-500/[0.03] to-transparent hover:border-amber-500/20 transition-all duration-500">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-black text-white uppercase tracking-tighter">Verified Link</h4>
                            <p className={`text-sm font-black uppercase tracking-widest ${walletConnected ? "text-emerald-500" : "text-amber-500"}`}>
                                {walletConnected ? "Active Secure Relay" : "Verification Pending"}
                            </p>
                        </div>
                    </div>
                </Link>

                <div className="glass-card rounded-[2.5rem] p-8 border-white/5 space-y-4">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Account Status</h4>
                    <div className="space-y-4">
                        <StatusRow label="Identity" value="Active" status={true} />
                        <StatusRow label="Withdrawal" value="Authorized" status={true} />
                        <StatusRow label="Trading" value="Enabled" status={true} />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </Container>
  );
}

const StatusRow = ({ label, value, status }) => (
    <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</span>
        <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status ? "bg-emerald-500 ring-4 ring-emerald-500/10" : "bg-gray-700"}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${status ? "text-white" : "text-gray-600"}`}>{value}</span>
        </div>
    </div>
);
