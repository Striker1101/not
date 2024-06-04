import React from "react";
import Container from "../../components/Container";
import GradientDiv from "../../components/vendor/Card/GradientDiv";

export default function Profile() {
  return (
    <Container>
      <div className="h-screen">
        <div className="flex flex-wrap gap-1 items-center justify-center">
          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <h1> Full Name </h1>
              <p></p>
            </GradientDiv>
          </div>

          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <h1> Full Name </h1>
              <p></p>
            </GradientDiv>
          </div>

          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <h1>Email </h1>
              <p></p>
            </GradientDiv>
          </div>

          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <h1>Password</h1>
              <p></p>
            </GradientDiv>
          </div>
        </div>
      </div>
    </Container>
  );
}
