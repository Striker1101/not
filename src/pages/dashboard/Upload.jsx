import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SelectInput from "../../components/vendor/form/SelectInput";
import FileInput from "../../components/vendor/form/FileInput";
import Alert from "../../components/vendor/alert/Alert";
import DefaultButton from "../../components/vendor/button/DefaultButton";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import DataTable from "./comp/DataTable";
import { v4 as uuidv4 } from "uuid";

import {
  addToCollectionArray,
  getUpdatedDocument,
} from "../../firebase/firestore";
export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [NFT, setNFT] = useState({ regions: [] });
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  const [check, setCheck] = useState(true);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    creator: "",
    collection_name: "",
    file: [],
    category: "",
    price: "",
    des: "",
    status: false,
  });

  useEffect(() => {
    // Callback function to handle updates
    if (!check) {
      return;
    }
    const handleUpdate = (data) => {
      setNFT(data);
    };

    // Start listening for updates
    const unsubscribe = getUpdatedDocument("nfts", handleUpdate);

    // Clean up the listener on component unmount
    return () => {
      unsubscribe();
      setTimeout(() => {
        setCheck(false);
      }, 1000);
    };
  }, [NFT, check]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
  const refInput = useRef(null);

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

  function reset() {
    setFormData({
      id: uuidv4(),
      creator: "",
      collection_name: "",
      file: [],
      category: "",
      price: "",
      des: "",
      status: false,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const result = await addToCollectionArray("nfts", formData);
    setResult(result);
    setCheck(true);
    setLoading(false);
    reset();
  }

  return (
    <Container title={"Upload NFT"}>
      <div className="w-screen flex flex-col items-center justify-center pb-8">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-2/3  bg-slate-200 dark:bg-slate-400 p-4 rounded-2xl"
        >
          <div className="">
            <h1 className="font-bold text-2xl">
              Submit Yout NFT for Evaluation
            </h1>
            <p className="text-sm">NFT INFORMATION</p>
          </div>
          <h3 className="m-3 text-xl text-green-400">
            NOTE GAS FEES OF ETH 0.10 WILL BE DEDUCTED FROM YOUR BALANCE FOR
            YOUR FIRST UPLOAD
          </h3>
          <Alert result={result} setResult={setResult} timer={false} />
          <div>
            <TextInput
              handleChange={handleChange}
              placeholder={"Creator's Name "}
              name={"creator"}
              value={formData.creator}
              type={"text"}
              required={true}
              bg="gray"
            />
            <TextInput
              handleChange={handleChange}
              placeholder={"Collection Name "}
              name={"collection_name"}
              value={formData.collection_name}
              type={"text"}
              required={true}
              bg="gray"
            />

            <FileInput
              handleChange={handleFileChange}
              placeholder={"File Upload"}
              name={"file"}
              value={formData.file}
              bg="gray"
              required={true}
              refInput={refInput}
              multiple={false}
            />

            <SelectInput
              handleChange={handleChange}
              placeholder={"The Category your NFT Belongs In"}
              name={"category"}
              value={formData.category}
              type={"text"}
              required={true}
              bg="gray"
              options={categoryOptions}
            />

            <TextInput
              handleChange={handleChange}
              placeholder={"Bid Price ETH"}
              name={"price"}
              value={formData.price}
              type={"number"}
              required={true}
              bg="gray"
            />

            <TextArea
              handleChange={handleChange}
              placeholder={"Describe Your unique NFT"}
              name={"des"}
              value={formData.des}
              bg="gray"
            />
            <div className="flex justify-center">
              <SubmitButton loading={loading} />
              <DefaultButton onClick={reset} type={"reset"}>
                Clear
              </DefaultButton>
            </div>
          </div>
        </form>

        <div className="mb-5 pb-5 flex items-center w-4/5 justify-center">
          <DataTable data={NFT.regions.slice(0)} />
        </div>
      </div>
    </Container>
  );
}
