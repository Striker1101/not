import React, { useState } from "react";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import TextInput from "../../../components/vendor/form/TextInput";
import { general } from "../../../utility/general";
import Container from "../../../components/Container";

export default function ResetPasswordConfirm() {
  const [formDate, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
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
          className="p-9 w-3/5 md:w-3/5  rounded-lg  bg-slate-200 dark:bg-slate-400   flex items-center flex-col gap-5"
        >
          <h1 className="font-bold text-lg ">{general.name}</h1>
          <p> Input Your New Password</p>

          <TextInput
            handleChange={handleChange}
            placeholder={"Password"}
            name={"password"}
            value={formDate.password}
            type={"password"}
            required={true}
          />

          <TextInput
            handleChange={handleChange}
            placeholder={"Confirm Password"}
            name={"password"}
            value={formDate.password}
            type={"password"}
            required={true}
          />

          <SubmitButton />
        </form>
      </div>
    </Container>
  );
}
