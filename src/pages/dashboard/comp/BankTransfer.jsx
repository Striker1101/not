import React, { useState } from "react";
import { useAppState } from "../../../AppStateContext";
import Container from "../../../components/Container";
import GradientDiv from "../../../components/vendor/Card/GradientDiv";
import Alert from "../../../components/vendor/alert/Alert";
import TextInput from "../../../components/vendor/form/TextInput";
import TextArea from "../../../components/vendor/form/TextArea";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import DefaultButton from "../../../components/vendor/button/DefaultButton";
export default function BankTransfer() {
  const { removeFirebasePrefix } = useAppState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  const [formData, setFormData] = useState({
    account_name: "",
    email: "",
    bank_name: "",
    swift_code: "",
    bank_address: "",
    withdraw_amount: "",
    additional_info: "",
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
    console.log(formData);
  }
  function reset() {
    setFormData({
      creator_name: "",
      collection_name: "",
      file: [],
      category: "",
      price: "",
      describe: "",
      type: "bank",
    });
  }
  const categoryOptions = [
    {
      content: "Art",
      value: "art",
    },
    {
      content: "Music",
      value: "music",
    },
    {
      content: "Domain names",
      value: "domain_names",
    },
    {
      content: "Sport",
      value: "sport",
    },
    {
      content: "Collectible",
      value: "collectible",
    },
    {
      content: "Photography",
      value: "photography",
    },
  ];
  return (
    <Container title={"Withdraw"}>
      <GradientDiv direction={"to left"} col1={"skyblue"} col2={"lightygra"}>
        <div className="w-full flex items-center justify-center">
          <form
            action=""
            className="w-4/5 flex flex-col gap-3 bg-slate-200 p-4 rounded-2xl"
          >
            <div className="flex gap-4 justify-evenly font-bold text-2xl ">
              <h1 className="">PLEASE PROVIDE YOUR BANK DETAILS</h1>
              {/* <div>&times;</div> */}
            </div>
            <Alert result={result} setResult={setResult} timer={false} />
            <div className="flex flex-col gap-3">
              <TextInput
                handleChange={handleChange}
                placeholder={"Account Name "}
                name={"account_name"}
                value={formData.account_name}
                type={"text"}
                required={true}
                bg="gray"
              />
              <TextInput
                handleChange={handleChange}
                placeholder={"Email Address "}
                name={"email"}
                value={formData.email}
                type={"email"}
                required={true}
                bg="gray"
              />
              <TextInput
                handleChange={handleChange}
                placeholder={"Bank Name "}
                name={"bank_name"}
                value={formData.bank_name}
                type={"email"}
                required={true}
                bg="gray"
              />

              <TextInput
                handleChange={handleChange}
                placeholder={"Swift Code "}
                name={"swift_code"}
                value={formData.swift_code}
                type={"text"}
                required={true}
                bg="gray"
              />

              <TextInput
                handleChange={handleChange}
                placeholder={"Bank Address "}
                name={"bank_address"}
                value={formData.bank_address}
                type={"text"}
                required={true}
                bg="gray"
              />

              <TextInput
                handleChange={handleChange}
                placeholder={"ETH Withdraw Amount "}
                name={"withdraw_amount"}
                value={formData.withdraw_amount}
                type={"number"}
                required={true}
                bg="gray"
              />

              <TextArea
                handleChange={handleChange}
                placeholder={"Additional Info"}
                name={"additional_info"}
                value={formData.additional_info}
                bg="gray"
              />
              <div className="flex justify-center">
                <SubmitButton loading={loading} />
                <DefaultButton onClick={reset} type={"reset"}>
                  Cancel
                </DefaultButton>
              </div>
            </div>
          </form>
        </div>
      </GradientDiv>
    </Container>
  );
}
