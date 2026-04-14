import React, { useState } from "react";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { Link } from "react-router-dom";
import TextInput from "../../../components/vendor/form/TextInput";
import { general } from "../../../utility/general";
import Alert from "../../../components/vendor/alert/Alert";
import { resetPassword, sendVerificationEmail } from "../../../api/auth";

export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Load cooldown from localStorage on mount
  React.useEffect(() => {
    const savedCooldown = localStorage.getItem("reset_cooldown_expiry");
    if (savedCooldown) {
      const remaining = Math.ceil((parseInt(savedCooldown) - Date.now()) / 1000);
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  // Timer effect
  React.useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    setLoading(true);
    const res = await resetPassword(formData.email);
    setResult(res);
    setLoading(false);

    if (res.status === 200) {
      // Set 5 minute cooldown + increment
      const currentMultiplier = parseInt(localStorage.getItem("reset_multiplier") || "1");
      const duration = 300 * currentMultiplier; // 5 mins starting
      const expiry = Date.now() + duration * 1000;
      
      localStorage.setItem("reset_cooldown_expiry", expiry.toString());
      localStorage.setItem("reset_multiplier", (currentMultiplier + 1).toString());
      setCooldown(duration);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-white/10 animate-fade-in relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tight gradient-text uppercase">
                Vault Recovery
            </h1>
            <p className="text-gray-400 font-medium">
                Secure your gateway to the digital frontier
            </p>
          </div>

          <Alert result={result} setResult={setResult} timer={5000} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="Enter your registered email"
                  name="email"
                  value={formData.email}
                  type="email"
                  required={true}
                  className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <SubmitButton 
                loading={loading} 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                text={cooldown > 0 ? `RETRY IN ${formatTime(cooldown)}` : "INITIATE RECOVERY"}
                disabled={cooldown > 0}
            />
          </form>

          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">
              Remembered your key?{" "}
              <Link to="/auth/login" className="text-blue-500 font-black hover:underline underline-offset-4 decoration-2">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
