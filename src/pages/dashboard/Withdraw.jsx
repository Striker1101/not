import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "../../components/vendor/tab/CustomTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import BankTransfer from "./comp/BankTransfer";
import CryptoTransfer from "./comp/CryptoTransfer";
import { getUpdatedDocument } from "../../firebase/firestore";

export default function Withdraw() {
  function filterArray(array, value, prop = "type") {
    return array.filter((item) => item[prop] === value);
  }
  const [withdraw, setWithdraw] = useState({ regions: [] });
  const [check, setCheck] = useState(true);
  useEffect(() => {
    console.log(check);
    if (!check) {
      return;
    }

    // Callback function to handle updates
    const handleUpdate = (data) => {
      setWithdraw(data);
    };

    console.log("here");
    // Start listening for updates
    const unsubscribe = getUpdatedDocument("withdraws", handleUpdate);

    // Clean up the listener on component unmount
    return () => {
      unsubscribe();
      setTimeout(() => {
        setCheck(false);
      }, 1000);
    };
  }, [withdraw, check]);
  console.log(withdraw);
  return (
    <div className="container mx-auto p-4">
      <Tabs>
        <Tab
          title={
            <div
              className=" bg-blue-100
             p-2 rounded flex gap-3 "
            >
              <FontAwesomeIcon
                icon={faCopy}
                className="cursor-pointer text-blue-500"
              />
              <p>Bank Transfer</p>
            </div>
          }
        >
          <BankTransfer
            withdraw={filterArray(withdraw.regions.slice(1), "bank")}
            setCheck={setCheck}
          />
        </Tab>
        <Tab
          title={
            <div className="bg-blue-100 p-2 rounded  flex gap-3 ">
              {" "}
              <FontAwesomeIcon
                icon={faCopy}
                className="cursor-pointer text-blue-500"
              />
              <p>Crypto Transfer</p>
            </div>
          }
        >
          <CryptoTransfer
            withdraw={filterArray(withdraw.regions.slice(1), "crypto")}
            setCheck={setCheck}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
