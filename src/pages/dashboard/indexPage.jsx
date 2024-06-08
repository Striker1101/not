import React from "react";
import GradientDiv from "../../components/vendor/Card/GradientDiv";
import Container from "../../components/Container";
import { ReactComponent as MoneyImg } from "../../resources/images/dashboard/index/money-check-dollar-svgrepo-com.svg";
import { ReactComponent as ProfitImg } from "../../resources/images/dashboard/index/profit-svgrepo-com.svg";
import { ReactComponent as AccountImg } from "../../resources/images/dashboard/index/account-arrows-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { datas } from "../../utility/dashboardIndexData";
import { useAppState } from "../../AppStateContext";
export default function IndexPage() {
  const { islogged, randomSelector } = useAppState();
  const userData = islogged.userData.users[0];
  const verify = islogged.user.emailVerified;
  return (
    <Container title="Dashboard Index">
      <div className="mx-6">
        <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
          <section
            id="wallet"
            className="flex gap-4 justify-evenly items-center p-2"
          >
            <div className=" p-4 ">
              <h3 className="font-bold">LINK YOUR WALLET</h3>
              <p className="hidden md:block">
                Get access to your assets, which are held on your blockchain. A
                private key to that address, which allows you to authorize
                transactions.
              </p>
            </div>
            <Link
              to={"/dashboard/terms"}
              className="border-4 border-white rounded-xl w-fit text-nowrap text-center  flex align-middl justify-center"
            >
              <p className="p-2 "> T & C</p>
            </Link>
          </section>
        </GradientDiv>
      </div>

      <div className="flex gap-4 m-6 flex-wrap items-center justify-center align-middle">
        <div className="rounded-2xl w-fit overflow-hidden">
          <GradientDiv
            direction={"to right"}
            col1={"lightblue"}
            col2={"#dbf5b3"}
          >
            <div className="flex  p-4  items-center g-4 justify-evenly rounded-2xl">
              <div>
                <div className="mr-4">
                  <span className="font-bold">ETH : </span>
                  <span className="font-bold">
                    {userData.balance.toFixed(2)}
                  </span>
                </div>
                <h1 className="text-lg">Total Balance</h1>
              </div>
              <MoneyImg className="w-10 h-10 rounded-2xl  border-4 p-1 border-blue-500" />
            </div>
          </GradientDiv>
        </div>

        <div className="rounded-2xl w-fit overflow-hidden">
          <GradientDiv
            direction={"to right"}
            col1={"lightblue"}
            col2={"#dbf5b3"}
          >
            <div className="flex  p-4  items-center g-4 justify-evenly rounded-2xl">
              <div>
                <div className="mr-4">
                  <span className="font-bold">ETH: </span>
                  <span className="font-bold">
                    {userData.profit.toFixed(2)}
                  </span>
                </div>
                <h1 className="text-lg">Total Profit</h1>
              </div>
              <ProfitImg className="w-10 h-10 rounded-2xl  border-4 p-1 border-blue-500" />
            </div>
          </GradientDiv>
        </div>

        <div className="rounded-2xl w-fit overflow-hidden">
          <GradientDiv
            direction={"to right"}
            col1={"lightblue"}
            col2={"#dbf5b3"}
          >
            <Link
              to={"/dashboard/profile"}
              className="flex p-4 items-center g-4 justify-evenly rounded-2xl"
            >
              <div>
                <div className="mr-4">
                  <span className="font-bold">Account Status : </span>
                </div>
                <h1 className="text-lg">
                  {" "}
                  {verify ? "Verified" : "Unverified"}
                </h1>
              </div>
              <AccountImg className="w-10 h-10 rounded-2xl  border-4 p-1 border-blue-500" />
            </Link>
          </GradientDiv>
        </div>
      </div>

      <div className="flex gap-4 m-6 flex-wrap items-center justify-center align-middle">
        <div className="w-full overflow-x-auto ">
          <table className="min-w-full pb-20 border-separate border border-slate-500 rounded-2xl overflow-hidden">
            <GradientDiv
              direction={"to right"}
              col1={"skyblue"}
              col2={"#dbf5b3"}
            >
              <thead>
                <tr>
                  <th className="border border-slate-600 px-4 py-2">
                    Contact Address
                  </th>
                  <th className="border border-slate-600 px-4 py-2">Name</th>
                  <th className="border border-slate-600 px-4 py-2">NFT</th>
                  <th className="border border-slate-600 px-4 py-2">
                    Market Capital
                  </th>
                  <th className="border border-slate-600 px-4 py-2">
                    Floor Price
                  </th>
                  <th className="border border-slate-600 px-4 py-2">
                    Total Minted
                  </th>
                  <th className="border border-slate-600 px-4 py-2">
                    Total Volume
                  </th>
                  <th className="border border-slate-600 px-4 py-2">
                    Number of Owners
                  </th>
                </tr>
              </thead>
              <tbody>
                {randomSelector(datas, 10).map((data, index) => {
                  return (
                    <tr key={index}>
                      <td class="border border-slate-700 p-2">
                        {data.contact_address}
                      </td>
                      <td class="border border-slate-700 p-2">{data.name}</td>
                      <td class="border border-slate-700 p-2">
                        {data.nft === null ? (
                          ""
                        ) : (
                          <img
                            src={data.nft}
                            alt="ntf"
                            width={70}
                            height={70}
                            className="min-w-44 h-48 rounded-2xl"
                          />
                        )}
                      </td>
                      <td class="border border-slate-700 p-2">
                        {data.market_cap}
                      </td>
                      <td class="border border-slate-700 p-2">
                        {data.floor_price}
                      </td>
                      <td class="border border-slate-700 p-2">
                        {data.total_minted}
                      </td>
                      <td class="border border-slate-700 p-2">
                        {data.total_volume}
                      </td>
                      <td class="border border-slate-700 p-2">{data.NOW}</td>
                    </tr>
                  );
                })}
              </tbody>
            </GradientDiv>
          </table>
        </div>
      </div>
    </Container>
  );
}
