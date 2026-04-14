import TextInput from "../../../components/vendor/form/TextInput";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { Link } from "react-router-dom";
import { general } from "../../../utility/general";
import { useAppState } from "../../../AppStateContext";
import { emailLogin } from "../../../api/auth";
import Alert from "../../../components/vendor/alert/Alert";
import { useState } from "react";

export default function Login() {
  const { islogged } = useAppState();
  if (islogged.status === 200) {
    window.location.href = "/dashboard";
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setLoading(true);
    const { email, password } = formData;
    const result = await emailLogin(email, password);
    setResult(result);
    setLoading(false);

    if (result.status === 200) {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-white/10 animate-fade-in relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tight gradient-text uppercase">
              {general.name}
            </h1>
            <p className="text-gray-400 font-medium">Welcome back, pioneer</p>
          </div>

          <Alert result={result} setResult={setResult} timer={5000} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                <TextInput
                  handleChange={handleChange}
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  type="email"
                  required={true}
                  className="rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-gray-300">Password</label>
                  <Link
                    className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                    to="/auth/reset_password"
                  >
                    Forgot?
                  </Link>
                </div>
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
            </div>

            <SubmitButton 
              loading={loading} 
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
              text="SIGN IN"
            />
          </form>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500 font-black hover:underline underline-offset-4 decoration-2">
              Join the future
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
