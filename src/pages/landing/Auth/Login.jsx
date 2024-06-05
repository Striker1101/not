import React, { useState } from "react";
import Container from "../../../components/Container";
import TextInput from "../../../components/vendor/form/TextInput";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { Link } from "react-router-dom";
import { general } from "../../../utility/general";
import { useAppState } from "../../../AppStateContext";
import { emailLogin } from "../../../firebase/auth";
import Alert from "../../../components/vendor/alert/Alert";

export default function Login() {
  const { islogged } = useAppState();
  //relogin users when they are already loginin/auth
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

    // Redirect to /dashboard if registration is successful
    if (result.status === 200) {
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000); // Redirect after 3 seconds
    }
  }
  return (
    <Container>
      <div className="auth flex items-center justify-center w-full align-middle">
        <form
          action=""
          onSubmit={handleSubmit}
          className="p-9 w-3/5 md:w-3/5  rounded-lg bg-slate-200 dark:bg-slate-400  "
        >
          <Alert result={result} setResult={setResult} timer={false} />

          <div className="flex items-center flex-col gap-5">
            <h1 className="font-bold text-lg ">{general.name}</h1>
            <p>Login Your Account</p>

            <TextInput
              handleChange={handleChange}
              placeholder={"Email"}
              name={"email"}
              value={formData.email}
              type={"email"}
              required={true}
            />

            <TextInput
              handleChange={handleChange}
              placeholder={"Password"}
              name={"password"}
              value={formData.password}
              type={"password"}
              required={true}
              password={true}
            />
            <div className="w-full m-3 p-0 font-semibold text-blue-500 text-sm md:xl relative ">
              <Link
                className="absolute right-0 bottom-2"
                to={"/auth/reset_password"}
              >
                Forgot Password
              </Link>
            </div>

            <SubmitButton loading={loading} />
          </div>
        </form>
      </div>
    </Container>
  );
}
