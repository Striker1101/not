import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import BlueButton from "../../components/vendor/button/BlueButton";
import DefaultButton from "../../components/vendor/button/DefaultButton";
import AutoCard from "../../components/AutoCard";
import ToggleCard from "../../components/vendor/Card/ToggleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { Link } from "react-router-dom";

export default function Homepage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container title={"HomePage"}>
      <section
        id="homeHeader"
        className="flex align-middle justify-center flex-wrap md:flex-wrap md:flex-nowrap items-center p-10"
      >
        <div className="flex-1">
          <h1 className="font-bold text-5xl pt-12 pb-7 text-gradient">
            Discover Digital Art, Collect And Sell Your Specific NFTs.
          </h1>
          <p className="pb-7 pt-5 text-gradient text-xl ">
            Partner with one of the world’s largest retailers to showcase your
            brand and products. Partner showcase and products.
          </p>
          <div className="">
            <BlueButton>
              <Link to={"/auth/login"}>Login</Link>
            </BlueButton>

            <DefaultButton>
              <Link to={"/auth/register"}>Register</Link>
            </DefaultButton>
          </div>
          <div className="pb-7 pt-5 flex items-center align-middle">
            <div>
              <h1 className="font-bold text-5xl pt-12 pb-7 text-blue-600">
                2M+
              </h1>
              <p>Exclusive Product </p>
            </div>
            <hr className="w-1 m-2 min-h-16 border-2" />
            <div>
              <h1 className="font-bold text-5xl pt-12 pb-7 text-blue-600">
                2k+
              </h1>
              <p>Digital Artist</p>
            </div>
            <hr className="w-1 m-2 min-h-16 border-2" />
            <div>
              <h1 className="font-bold text-5xl pt-12 pb-7 text-blue-600">
                22k+
              </h1>
              <p>Auction</p>
            </div>
          </div>
        </div>
        <AutoCard name={"home_header"} />
      </section>
      <section id="live_auction" className="mx-6">
        <di className="flex items-center ">
          <div className="w-6 h-6 dot m-4 rounded-full"></div>
          <h1 className="font-bold text-3xl">Live Auctions</h1>
        </di>
        <hr />
        <div className=" mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-4">
          <AutoCard name={"auction"} />
        </div>
      </section>
      <section id="creators">
        <h1 className="text-3xl font-bold  mb-8">Creators of the Week</h1>
        <hr />
        <AutoCard name={"creators"} />
      </section>
      <section id="creation">
        <h1 className="text-3xl font-bold  mb-8">Creators of the Week</h1>
        <hr />
        <AutoCard name={"creation"} />
      </section>
      <section id="artwork">
        <h1 className="text-3xl font-bold  mb-8">Explore ArtWork</h1>
        <hr />
        <div className=" mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-4">
          <AutoCard name={"artwork"} />
        </div>
      </section>
      <section id="howrear">
        <div className="flex items-center flex-col md:flex-row  align-middle text-center">
          <h1 className="text-3xl font-bold  mb-8">HowRear Sea Works</h1>
          <BlueButton>For Creators</BlueButton>

          <DefaultButton>For Collections</DefaultButton>
        </div>
        <hr className="m-3" />
        <div className="flex flex-wrap items-center justify-center w-full ">
          <ToggleCard
            toggle={true}
            desc={
              "Set up your wallet and then you can create, sell & collect NFTs atRear Sea."
            }
            title="Set Up Your Wallet"
            bg="blue"
            img={<FontAwesomeIcon icon={faWallet} />}
            key={"wallet"}
          />
          <ToggleCard
            toggle={false}
            desc={
              "After setting up your wallet, you can add your NFTs onRear Sea."
            }
            title="Add Your NFTs"
            bg="lightgreen"
            img={<FontAwesomeIcon icon={faBorderAll} />}
            key={"wallet"}
          />
          <ToggleCard
            toggle={true}
            desc="After adding your NFTs, you can list your NFTs for sale."
            title="Sell Your NFTs"
            bg="lighblue"
            img={<FontAwesomeIcon icon={faCartPlus} />}
            key={"wallet"}
          />
        </div>
        <div>
          <div className=" rounded-lg bg-gray-300 p-10 m-10 ">
            <h1 className="font-bold text-xl md:text-2xl xl:text-4xl  pt-12 pb-7 text-gradient w-1/2 md:w-1/3">
              Create, Sell & Collect NFTs At Rear Sea
            </h1>
            <p>
              Aliquam viverra enim commodo sed consequat tempor sit nisl cursus
              lectus.
            </p>
            <BlueButton>
              <Link to={"/auth/login"}>Sign Up</Link>
            </BlueButton>
            <DefaultButton>
              <Link to={"/auth/register"}>Sign In</Link>
            </DefaultButton>
          </div>
        </div>
      </section>
    </Container>
  );
}
