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
  const [withdraw, setWithdraw] = useState([]);
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
          />
        </Tab>
      </Tabs>
    </div>
  );
}
