import React, { useState } from "react";
import Container from "../../../components/Container";
import TextInput from "../../../components/vendor/form/TextInput";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { Link } from "react-router-dom";
import { general } from "../../../utility/general";

export default function Login() {
  const [formDate, setFormDate] = useState({
    email: "",
    password: "",
  });
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
          <p>Login Your Account</p>

          <TextInput
            handleChange={handleChange}
            placeholder={"Email"}
            name={"email"}
            value={formDate.email}
            type={"email"}
            required={true}
          />

          <TextInput
            handleChange={handleChange}
            placeholder={"Password"}
            name={"password"}
            value={formDate.password}
            type={"password"}
            required={true}
          />
          <div className="w-full   m-3 p-0 font-semibold text-blue-500 text-xl relative ">
            <Link
              className="absolute right-0 bottom-2"
              to={"/auth/reset_password"}
            >
              Forgot Password
            </Link>
          </div>

          <SubmitButton />
        </form>
      </div>
    </Container>
  );
}
