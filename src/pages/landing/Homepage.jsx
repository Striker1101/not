import React from "react";
import Container from "../../components/Container";
import BlueButton from "../../components/vendor/button/BlueButton";
import DefaultButton from "../../components/vendor/button/DefaultButton";
import AutoCard from "../../components/AutoCard";

export default function Homepage() {
  return (
    <Container>
      <section
        id="homeHeader"
        className="flex align-middle justify-center items-center p-10"
      >
        <div>
          <h1 className="font-bold text-5xl pt-12 pb-7 text-gradient">
            Discover Digital Art, Collect And Sell Your Specific NFTs.
          </h1>
          <p className="pb-7 pt-5 text-gradient text-xl ">
            Partner with one of the world’s largest retailers to showcase your
            brand and products. Partner showcase and products.
          </p>
          <div className="">
            <BlueButton>Login</BlueButton>

            <DefaultButton>Register</DefaultButton>
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
    </Container>
  );
}
