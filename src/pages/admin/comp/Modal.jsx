import React, { useState, useEffect } from "react";
import TextInput from "../../../components/vendor/form/TextInput";
import SubmitButton from "../../../components/vendor/button/SubmitButton";
import {
  deleteFromCollectionArray,
  getUserData,
  updateDocument,
  updateDocumentArray,
} from "../../../firebase/firestore";
import Table from "./Table";
import Alert from "../../../components/vendor/alert/Alert";
const Modal = ({ showModal, setShowModal, selectedItem, setSelectedItem }) => {
  const [loading, setLoading] = useState(false);

  function handleChange(e, dataName) {
    const { name, value } = e.target;

    if (dataName === "users") {
      setSelectedItem((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  const [withdraws, setWithdraw] = useState({
    status: 0,
    data: { regions: [] },
  });
  const [deposits, setDepsoit] = useState({ status: 0, data: { regions: [] } });
  const [nfts, setNfts] = useState({ status: 0, data: { regions: [] } });
  const [wallet, setWallet] = useState({ status: 0, data: { regions: [] } });
  const [result, setResult] = useState({
    status: 0,
    message: null,
  });
  useEffect(() => {
    async function getter() {
      const resultWithdraw = await getUserData("withdraws", selectedItem.uid);
      setWithdraw(resultWithdraw);

      const resultDeposit = await getUserData("deposits", selectedItem.uid);
      setDepsoit(resultDeposit);

      const resultNfts = await getUserData("nfts", selectedItem.uid);
      setNfts(resultNfts);

      const resultWallet = await getUserData("wallet", selectedItem.uid);
      setWallet(resultWallet);
    }
    getter();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const result = await updateDocument(
      "users",
      { profit: selectedItem.profit, balance: selectedItem.balance },
      selectedItem.uid
    );
    setResult(result);
    setLoading(false);
  }

  function close() {
    setShowModal(false);
    setSelectedItem({
      balance: null,
      email: null,
      id: null,
      password: null,
      profit: null,
      uid: null,
      updated_at: null,
    });
  }
  if (!showModal) return null;

  async function handleDelete(collection, index) {
    setLoading(true);
    const result = await deleteFromCollectionArray(collection, index);
    setResult(result);
    setLoading(false);
  }

  async function handleClick(collection, documentID, index, data) {
    console.group(collection, documentID, index, data);
    setLoading(true);
    const result = await updateDocumentArray(
      collection,
      documentID,
      index,
      data
    );
    setResult(result);
    setLoading(false);
  }
  return (
    <div className="fixed pt-10 mt-[40px] pb-[40px] inset-3 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-scroll">
      <div className="relative pt-10 mt-[40px] w-full max-w-4xl mx-auto my-8 bg-white rounded shadow-lg overflow-hidden">
        <div className="flex justify-end pt-10 mt-[40px]">
          <button
            className="text-gray-600 hover:text-red-900 font-4xl "
            onClick={close}
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-screen">
          <div className="container">
            <form action="" onSubmit={handleSubmit}>
              <Alert result={result} setResult={setResult} timer={false} />
              <TextInput
                handleChange={(e) => {
                  handleChange(e, "users");
                }}
                placeholder={"Enter balance"}
                name={"balance"}
                value={selectedItem.balance}
                type={"number"}
                required={true}
                bg="gray"
              />

              <TextInput
                handleChange={(e) => {
                  handleChange(e, "users");
                }}
                placeholder={"Enter Profit"}
                name={"profit"}
                value={selectedItem.profit}
                type={"number"}
                required={true}
                bg="gray"
              />

              <SubmitButton loading={loading} />
            </form>
          </div>
          <div className="pt-4">
            <div>
              {withdraws.status === 200 ? (
                <div className="container mx-auto pt-4">
                  <h1 className="text-2xl font-bold mb-4">Withdraw Table</h1>
                  <Table
                    data={withdraws.data.regions}
                    handleDelete={handleDelete}
                    handleClick={handleClick}
                    collection="withdraws"
                    uid={selectedItem.uid}
                  />
                </div>
              ) : null}
            </div>

            <div>
              {deposits.status === 200 ? (
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Deposit Table</h1>
                  <Table
                    data={deposits.data.regions}
                    handleDelete={handleDelete}
                    handleClick={handleClick}
                    collection="deposits"
                    uid={selectedItem.uid}
                  />
                </div>
              ) : null}
            </div>

            <div>
              {nfts.status === 200 ? (
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">NFTs Table</h1>
                  <Table
                    data={nfts.data.regions}
                    handleDelete={handleDelete}
                    handleClick={handleClick}
                    collection="nfts"
                    uid={selectedItem.uid}
                  />
                </div>
              ) : null}
            </div>

            <div>
              {wallet.status === 200 ? (
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Wallet Table</h1>
                  <Table
                    data={wallet.data.regions}
                    handleDelete={handleDelete}
                    handleClick={handleClick}
                    collection="wallet"
                    uid={selectedItem.uid}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
