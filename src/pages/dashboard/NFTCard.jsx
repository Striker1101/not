import React from "react";
import { useParams } from "react-router-dom";
import { datas as minted } from "../../utility/mintedData";
import { datas as buy } from "../../utility/buyData";
import Container from "../../components/Container";
import GradientDiv from "../../components/vendor/Card/GradientDiv";
import { general } from "../../utility/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner";
import { useLocation } from "react-router-dom";
library.add(faCopy);
function generateRandomString(length = 16) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const NFTCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const path = queryParams.get("path");
  console.log(path, id);

  let datas = [];

  if (path === "minted") {
    datas = minted;
  } else if (path === "buy") {
    datas = buy;
  } else if (path === "user_nft") {
  }
  console.log(datas);

  const card = datas.find((item) => item.id === parseInt(id));

  if (!card) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="pb-9">
      <Container title={`Card ${card.creator}`}>
        <div className="card-detail flex flex-col gap-5">
          <GradientDiv col1="lightgray" col2="#dbf5b3" direction="to bottom">
            <h1 className="text-2xl font-bold p-4 pb-16">{card.creator}</h1>
            <div className=" py-6 px-3 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
              <div className="min-h-44 mb-4 md:w-4/5 flex-grow-2">
                {card.type === "image" ? (
                  <img
                    src={card.content}
                    className="rounded-3xl  md:min-h-96 w-full"
                    alt=""
                  />
                ) : (
                  <video src={card.content} controls></video>
                )}
              </div>
              <div>
                <div className="flex gap-3 items-center">
                  <p className="border-2 border-blue-400 rounded-xl py-2 px-4 bg-inherit text-blue-400">
                    {" "}
                    {card.creator}
                  </p>

                  <div className="w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#77bb41"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex ">
                  <h1 className="font-bold text-2xl">{card.creator}</h1>
                </div>
                <div>
                  <div className="flex gap-3 ">
                    <p className="text">ETH</p> <p>Highest Bid</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      {card.type === "image" ? (
                        <img
                          src={card.content}
                          className="rounded-3xl"
                          alt=""
                          width={70}
                          height={70}
                        />
                      ) : (
                        <video src={card.content} controls></video>
                      )}
                      <div className="w-6 absolute bg-white rounded-3xl  right-0 top-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#77bb41"
                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg">Creator: {card.creator}</p>
                      <p className="text-lg text-green-700">@{general.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex gap-2 pl-4">
              <FontAwesomeIcon
                icon="fa-solid fa-copy"
                bounce
                style={{ color: "#669c35" }}
              />
              <h2 className="font-bold text-2xl"> DETAILS</h2>
            </button>
          </GradientDiv>
          <div className="flex flex-col gap-5 px-4 shadow-2xl">
            <div className="flex gap-3">
              <p className="text-gray-400 text-lg">Contact Address: </p>
              <div className="border-2 border-gray-700 text-green-600 px-3 flex items-center rounded-2xl ">
                <h1 className="space-x-5">{generateRandomString(32)}</h1>
              </div>
            </div>
            <Holder props={"Creator:"} value={card.creator} />
            <Holder props={"BlockChain:"} value={"Ethereum"} />
            <Holder props={"Created At:"} value={card.created_at} />
            <Holder props={"Description:"} value={card.des} />
            <hr />
            <h1 className="text-xl font-bold p-4 pb-16">{card.creator}</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NFTCard;

function Holder({ props, value }) {
  return (
    <div className="flex gap-3">
      <p className="text-gray-400 text-xl">{props}:</p>
      <span>{"  "}</span>
      <p className=" text-xl">{value}</p>
    </div>
  );
}
