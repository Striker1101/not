import React, { useState, useRef } from "react";
import Container from "../../components/Container";
import { ReactComponent as WarningImg } from "../../resources/images/dashboard/trans/triangle-exclamation-solid.svg";
import SelectInput from "../../components/vendor/form/SelectInput";
import TextInput from "../../components/vendor/form/TextInput";
import FileInput from "../../components/vendor/form/FileInput";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function Deposit() {
  const [formData, setFormData] = useState({
    wallet: "",
    amount: "",
    file: [],
  });
  const refInput = useRef(null);
  const wallet = useRef(null);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "wallet") {
      wallet.current = value;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });

  const categoryOptions = [
    {
      content: "Etherum ERC20",
      value: "0x3ab73CB5Ebe9Dd092E7Ee43eF9778fC0e8A29e91",
    },
    {
      content: "Bitcoin BTC",
      value: "34hfes2BmfdnXP74BUZCMnnHfXWPhyYnXz",
    },
    {
      content: "USDT TRC20",
      value: "TPwUeQBX4F74KQ42P1ko2bhqdtMcg8KuT1",
    },
    {
      content: "BNB",
      value: "0x81a92f6A577dfd88a055951489eC59Ae5253DD6A",
    },
  ];

  const handleFileChange = () => {
    // create data transfer
    const dt = new DataTransfer();

    // define max size in bytes
    const maxSize = 10000000;

    // ensure refInput is not null
    if (refInput.current && refInput.current.files) {
      // add eligible files to data transfer
      for (const file of refInput.current.files) {
        if (file.size <= maxSize) {
          dt.items.add(file);
          console.log(dt.files);
        } else {
          console.log("not");
          return setResult({
            status: 500,
            message: "File size exceeds limit",
          });
        }
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        file: dt.files,
      }));
    } else {
      console.error("File input is not available.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(wallet.current)
      .then(() => {
        alert("Address has been copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container title="Deposit">
      <div className="flex items-center justify-center flex-col h-screen">
        <div className="flex gap-3 w-4/5 m-6 bg-purple-600 mx-4 rounded-t-xl p-3">
          <WarningImg />
          <p>
            Please the only accepted digital currency is Ethereum(ETH), Rear Sea
            won't be liable for any loss of funds.
          </p>
        </div>
        <div className="w-4/5">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex items-center justify-center w-full"
          >
            <div className=" bg-slate-400 p-5">
              <h1 className="text-xl font-semibold p-2 ">
                DEPOSIT AND SUBMIT PROOF TO TOP UP YOUR BALANCE
              </h1>
              <div className="p-4 flex items-center">
                <span className="mr-2">{wallet.current}</span>
                <FontAwesomeIcon
                  icon={faCopy}
                  className="cursor-pointer text-blue-500"
                  onClick={copyToClipboard}
                />
              </div>
              <SelectInput
                handleChange={handleChange}
                placeholder={"Select Crypto Wallet"}
                name={"wallet"}
                value={formData.category}
                required={true}
                bg="gray"
                options={categoryOptions}
              />

              <TextInput
                handleChange={handleChange}
                placeholder={"Amount"}
                name={"amount"}
                value={formData.amount}
                type={"number"}
                required={true}
                bg="gray"
              />

              <FileInput
                handleChange={handleFileChange}
                placeholder={"Payment Proof"}
                name={"file"}
                value={formData.file}
                bg="gray"
                required={true}
                refInput={refInput}
              />

              <SubmitButton loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
