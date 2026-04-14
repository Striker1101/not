import { useState } from "react";
import TextInput from "../../../components/vendor/form/TextInput";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { general } from "../../../utility/general";
import { createAccount } from "../../../api/auth";
import { useAppState } from "../../../AppStateContext";
import Alert from "../../../components/vendor/alert/Alert";
import { Link } from "react-router-dom";

export default function Register() {
  const { islogged } = useAppState();
  if (islogged.status === 200) {
    window.location.href = "/dashboard";
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setResult({
        status: 400,
        message: "Passwords do not Match",
      });
      return;
    }

    setLoading(true);
    const { name, email, password } = formData;
    const result = await createAccount(name, email, password);

    setResult(result);
    setLoading(false);

    if (result.status === 200) {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-white/10 animate-fade-in relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tight gradient-text uppercase">
              CREATE ACCOUNT
            </h1>
            <p className="text-gray-400 font-medium whitespace-pre-wrap">Join {general.name} NFT Marketplace</p>
          </div>

          <Alert result={result} setResult={setResult} timer={5000} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Full Name</label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  type="text"
                  required={true}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="john@example.com"
                  name="email"
                  value={formData.email}
                  type="email"
                  required={true}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Password</label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  type="password"
                  required={true}
                  password={true}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Confirm Password</label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="••••••••"
                  name="cpassword"
                  value={formData.cpassword}
                  type="password"
                  required={true}
                  password={true}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded-lg bg-white/5 border-white/10 text-blue-500 focus:ring-blue-500/20 transition-all cursor-pointer"
                name="tc"
                id="tc"
                required
              />
              <label htmlFor="tc" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                I accept the <span className="text-blue-500 font-bold">Terms & Conditions</span> and Product Disclosure Statement. I understand this is an ASIC Regulated platform.
              </label>
            </div>

            <SubmitButton 
              loading={loading} 
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
              text="GET STARTED"
            />
          </form>

          <p className="text-center text-gray-400 text-sm">
            Already a member?{" "}
            <Link to="/auth/login" className="text-blue-500 font-black hover:underline underline-offset-4 decoration-2">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
