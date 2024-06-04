import React, { useEffect, useState } from "react";
import { useAppState } from "../../../AppStateContext";
import Container from "../../../components/Container";
import GradientDiv from "../../../components/vendor/Card/GradientDiv";
import Alert from "../../../components/vendor/alert/Alert";
import TextInput from "../../../components/vendor/form/TextInput";
import TextArea from "../../../components/vendor/form/TextArea";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import DefaultButton from "../../../components/vendor/button/DefaultButton";
import {
  addToCollectionArray,
  getUpdatedDocument,
} from "../../../firebase/firestore";
import DataTable from "./DataTable";
export default function BankTransfer() {
  const [loading, setLoading] = useState(false);
  const [withdraw, setWithdraw] = useState({ regions: [] });
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
    status: false,
  });

  useEffect(() => {
    // Callback function to handle updates
    const handleUpdate = (data) => {
      setWithdraw(data);
    };

    // Start listening for updates
    const unsubscribe = getUpdatedDocument("withdraws", handleUpdate);

    // Clean up the listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [withdraw]);

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
    const result = await addToCollectionArray("withdraws", formData);
    setResult(result);
    setLoading(false);
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
      status: false,
    });
  }

  return (
    <Container title={"Withdraw"}>
      <GradientDiv direction={"to left"} col1={"skyblue"} col2={"lightygra"}>
        <div className="w-full flex flex-col items-center justify-center">
          <form
            action=""
            onSubmit={handleSubmit}
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
                type={"text"}
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

          <div className="mb-5 pb-5 flex items-center w-4/5 justify-center">
            <DataTable data={withdraw.regions.slice(1)} />
          </div>
        </div>
      </GradientDiv>
    </Container>
  );
}
