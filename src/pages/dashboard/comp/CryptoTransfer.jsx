import React, { useEffect, useState } from "react";
import { useAppState } from "../../../AppStateContext";
import Container from "../../../components/Container";
import GradientDiv from "../../../components/vendor/Card/GradientDiv";
import Alert from "../../../components/vendor/alert/Alert";
import TextInput from "../../../components/vendor/form/TextInput";
import TextArea from "../../../components/vendor/form/TextArea";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import DefaultButton from "../../../components/vendor/button/DefaultButton";
import SelectInput from "../../../components/vendor/form/SelectInput";
import DataTable from "./DataTable";
import {
  addToCollectionArray,
  getUpdatedDocument,
} from "../../../firebase/firestore";
export default function CryptoTransfer({ setCheck, withdraw }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });

  const [formData, setFormData] = useState({
    wallet_name: "",
    email: "",
    wallet_address: "",
    withdraw_amount: "",
    additional_info: "",
    type: "crypto",
    status: false,
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
    const result = await addToCollectionArray("withdraws", formData);
    setResult(result);
    setCheck(true);
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
      status: false,
    });
  }

  const categoryOptions = [
    {
      content: "Etherum ERC20",
      value: "Etherum ERC20",
    },
    {
      content: "Bitcoin BTC",
      value: "Bitcoin BTC",
    },
    {
      content: "USDT TRC20",
      value: "USDT TRC20",
    },
    {
      content: "BNB",
      value: "BNB",
    },
  ];

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
              <h1 className="">PLEASE PROVIDE YOUR WALLET DETAILS</h1>
              {/* <div>&times;</div> */}
            </div>
            <Alert result={result} setResult={setResult} timer={false} />
            <div className="flex flex-col gap-3">
              <SelectInput
                handleChange={handleChange}
                placeholder={"Select Crypto Wallet"}
                name={"wallet_name"}
                value={formData.wallet_name}
                required={true}
                bg="gray"
                options={categoryOptions}
              />

              <TextInput
                handleChange={handleChange}
                placeholder={"Wallet Address "}
                name={"wallet_address"}
                value={formData.wallet_address}
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
            <DataTable data={withdraw} />
          </div>
        </div>
      </GradientDiv>
    </Container>
  );
}
