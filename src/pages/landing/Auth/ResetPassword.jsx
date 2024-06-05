import React, { useState } from "react";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { Link } from "react-router-dom";
import TextInput from "../../../components/vendor/form/TextInput";
import Container from "../../../components/Container";
import { general } from "../../../utility/general";
import BlueButton from "../../../components/vendor/button/BlueButton";
import DefaultButton from "../../../components/vendor/button/DefaultButton";
import Alert from "../../../components/vendor/alert/Alert";
import { resetPassword, sendVerificationEmail } from "../../../firebase/auth";
export default function ResetPassword() {
  const [formDate, setFormDate] = useState({
    email: "",
  });
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  const [toggle, setToggle] = useState(null);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormDate((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (toggle === "reset") {
      //reset password
      const result = await resetPassword(formDate.email);
      setResult(result);
    } else {
      //email verification
      const result = sendVerificationEmail(formDate.email);
      setResult(result);
    }
    console.log(result, toggle);
  }
  return (
    <Container>
      <div className="auth flex items-center justify-center w-full align-middle">
        <form
          action=""
          onSubmit={handleSubmit}
          className="p-9 w-3/5 md:w-3/5  rounded-lg bg-slate-200 dark:bg-slate-400  flex items-center flex-col gap-5"
        >
          <Alert result={result} setResult={setResult} timer={false} />
          <h1 className="font-bold text-lg ">{general.name}</h1>
          <p>Reset Password for Your Account</p>

          <TextInput
            handleChange={handleChange}
            placeholder={"Email"}
            name={"email"}
            value={formDate.email}
            type={"email"}
            required={true}
          />

          <div>
            <BlueButton
              onClick={() => {
                setToggle("reset");
              }}
            >
              Reset Password
            </BlueButton>

            <DefaultButton
              onClick={() => {
                setToggle("verify");
              }}
            >
              Email Verification
            </DefaultButton>
          </div>

          <div className="w-full   m-3 p-0 font-semibold text-blue-500 text-xl relative ">
            <Link className="absolute right-0 bottom-2" to={"/auth/login"}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
