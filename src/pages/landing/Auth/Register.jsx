import React, { useState } from "react";
import TextInput from "../../../components/vendor/form/TextInput";
import Container from "../../../components/Container";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { general } from "../../../utility/general";

export default function Register() {
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
          <p>Create An Account With Rear Sea NFT Marketplace</p>
          <TextInput
            handleChange={handleChange}
            placeholder={"Full Name"}
            name={"name"}
            value={formDate.name}
            type={"text"}
            required={true}
          />

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

          <TextInput
            handleChange={handleChange}
            placeholder={"Confirm Password"}
            name={"password"}
            value={formDate.password}
            type={"password"}
            required={true}
          />
          <div className="">
            <input type="checkbox" className="p-3" name="tc" id="tc" required />
            <label htmlFor="tc">
              I accept the Rear Sea AUS (by Gleneagle) - Terms & Conditions,
              Product Disclosure Statement. (ASIC Regulated)
            </label>
          </div>
          <SubmitButton />
        </form>
      </div>
    </Container>
  );
}
