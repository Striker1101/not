import React from "react";
import { Tabs, Tab } from "../../components/vendor/tab/CustomTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import BankTransfer from "./comp/BankTransfer";
import CryptoTransfer from "./comp/CryptoTransfer";

export default function Withdraw() {
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
          <BankTransfer />
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
          <CryptoTransfer />
        </Tab>
      </Tabs>
    </div>
  );
}
