import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import TextInput from "../../../components/vendor/form/TextInput";
import Alert from "../../../components/vendor/alert/Alert";
import { resetPasswordConfirm } from "../../../api/auth";

export default function ResetPasswordConfirm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [formData, setFormData] = useState({
    email: queryParams.get("email") || "",
    code: queryParams.get("code") || "",
    password: "",
    confirm_password: "",
  });

  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
        setResult({ status: 400, message: "Vault keys do not match. Please verify your new security phrase." });
        return;
    }

    setLoading(true);
    const res = await resetPasswordConfirm(formData.email, formData.code, formData.password);
    setResult(res);
    setLoading(false);
    
    if (res.status === 200) {
        setTimeout(() => {
            window.location.href = "/auth/login";
        }, 3000);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl border-white/10 animate-fade-in relative overflow-hidden group">
        {/* Dynamic decorative backdrop */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] group-hover:bg-emerald-500/30 transition-all duration-700"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 space-y-10">
          <div className="text-center space-y-3">
             <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/20 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             </div>
             <h1 className="text-4xl font-black tracking-tight gradient-text uppercase">
                Finalize Recovery
             </h1>
             <p className="text-gray-400 font-medium text-sm leading-relaxed px-4">
                Verify your identity code and synchronize a new security phrase with the BlockArt relay.
             </p>
          </div>

          <Alert result={result} setResult={setResult} timer={7000} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 opacity-70">Target Endpoint</label>
                 <TextInput
                   handleChange={handleChange}
                   placeholder="Email"
                   name="email"
                   value={formData.email}
                   type="email"
                   required={true}
                   className="rounded-2xl bg-white/5 border-white/10 text-white/50 cursor-not-allowed text-xs"
                   readOnly
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Verification Token</label>
                 <TextInput
                   handleChange={handleChange}
                   placeholder="6-Digit Authorization Code"
                   name="code"
                   value={formData.code}
                   required={true}
                   className="rounded-2xl bg-emerald-500/5 border-emerald-500/20 text-emerald-400 font-mono tracking-[0.5em] text-center text-lg"
                 />
               </div>

               <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Vault Phrase</label>
                    <TextInput
                      handleChange={handleChange}
                      placeholder="••••••••"
                      name="password"
                      value={formData.password}
                      type="password"
                      required={true}
                      password={true}
                      className="rounded-2xl bg-white/5 border-white/10 text-white"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Re-Verify Phrase</label>
                    <TextInput
                      handleChange={handleChange}
                      placeholder="••••••••"
                      name="confirm_password"
                      value={formData.confirm_password}
                      type="password"
                      required={true}
                      password={true}
                      className="rounded-2xl bg-white/5 border-white/10 text-white"
                    />
                 </div>
               </div>
            </div>

            <SubmitButton 
              loading={loading} 
              className="w-full py-5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              text="SYNCHRONIZE NEW KEY"
            />
          </form>

          <p className="text-center">
             <Link to="/auth/login" className="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                Cancel Synchronization
             </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
