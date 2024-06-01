import React, { useState } from "react";
import TextInput from "../../../components/vendor/form/TextInput";
import Container from "../../../components/Container";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import { general } from "../../../utility/general";
import { createAccount } from "../../../firebase/auth";
import { useAppState } from "../../../AppStateContext";
import Alert from "../../../components/vendor/alert/Alert";

export default function Register() {
  const { removeFirebasePrefix, islogged } = useAppState();
  //relogin users when they are already loginin/auth
  if (islogged.status == 200) {
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
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = formData;
    const result = await createAccount(name, email, password);
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
    <Container title={"Register"}>
      <div className="auth flex items-center justify-center w-full align-middle">
        <form
          action=""
          onSubmit={handleSubmit}
          className="p-9 w-3/5 md:w-3/5  rounded-lg  bg-slate-200 dark:bg-slate-400 "
        >
          <Alert
            message={removeFirebasePrefix(result.message)}
            timer={false}
            type={result.status === 200 ? true : false}
          />
          <div className="flex items-center flex-col gap-5">
            <h1 className="font-bold text-lg ">{general.name}</h1>
            <p>Create An Account With Rear Sea NFT Marketplace</p>
            <TextInput
              handleChange={handleChange}
              placeholder={"Full Name"}
              name={"name"}
              value={formData.name}
              type={"text"}
              required={true}
            />

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
            />

            <TextInput
              handleChange={handleChange}
              placeholder={"Confirm Password"}
              name={"cpassword"}
              value={formData.cpassword}
              type={"password"}
              required={true}
            />
            <div className="">
              <input
                type="checkbox"
                className="p-3"
                name="tc"
                id="tc"
                required
              />
              <label htmlFor="tc">
                I accept the Rear Sea AUS (by Gleneagle) - Terms & Conditions,
                Product Disclosure Statement. (ASIC Regulated)
              </label>
            </div>
            <SubmitButton loading={loading} />
          </div>
        </form>
      </div>
    </Container>
  );
}
