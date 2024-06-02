import React, { useRef, useState } from "react";
import Container from "../../components/Container";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SelectInput from "../../components/vendor/form/SelectInput";
import FileInput from "../../components/vendor/form/FileInput";
import Alert from "../../components/vendor/alert/Alert";
import { useAppState } from "../../AppStateContext";
import DefaultButton from "../../components/vendor/button/DefaultButton";
import SubmitButton from "../../components/vendor/button/SubmitButton";
export default function Upload() {
  const { removeFirebasePrefix } = useAppState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  const [formData, setFormData] = useState({
    creator_name: "",
    collection_name: "",
    file: [],
    category: "",
    price: "",
    describe: "",
  });

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

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <Container title={"Upload NFT"}>
      <div className="w-screen flex items-center justify-center pt-8">
        <form action="" onSubmit={handleSubmit} className="w-2/3">
          <Alert
            message={removeFirebasePrefix(result.message)}
            timer={false}
            type={result.status === 200 ? true : false}
          />
          <div>
            <TextInput
              handleChange={handleChange}
              placeholder={"Creator's Name "}
              name={"creator_name"}
              value={formData.creator_name}
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
              name={"describe"}
              value={formData.describe}
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
      </div>
    </Container>
  );
}
