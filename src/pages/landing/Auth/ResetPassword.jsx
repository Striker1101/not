import React, { useState } from "react";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { Link } from "react-router-dom";
import TextInput from "../../../components/vendor/form/TextInput";
import Container from "../../../components/Container";
import { general } from "../../../utility/general";
import BlueButton from "../../../components/vendor/button/BlueButton";
import DefaultButton from "../../../components/vendor/button/DefaultButton";
export default function ResetPassword() {
  const [formDate, setFormDate] = useState({
    email: "",
  });
  const [toggle, setToggle] = useState(null);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormDate((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formDate);
  }
  return (
    <Container>
      <div className="auth flex items-center justify-center w-full align-middle">
        <form
          action=""
          className="p-9 w-3/5 md:w-3/5  rounded-lg bg-slate-200 dark:bg-slate-400  flex items-center flex-col gap-5"
        >
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
