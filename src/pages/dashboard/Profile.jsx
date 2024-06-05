import React, { useState } from "react";
import Container from "../../components/Container";
import GradientDiv from "../../components/vendor/Card/GradientDiv";
import { useAppState } from "../../AppStateContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { islogged } = useAppState();
  const userData = islogged.user;
  const user = islogged.userData.users[0];

  let nft = [];
  if (islogged.userData.nfts.length > 0) {
    nft = islogged.userData.nfts[0].regions;
  }

  const [formData, setFormData] = useState({
    display_name: userData.displayName,
    email: userData.email,
    password: user.password,
  });
  const [type, setType] = useState("password");
  const handlePasswordDisplay = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <Container>
      <div className="h-screen">
        <div className="flex flex-wrap gap-1 items-center justify-center">
          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <div className="p-10">
                <h1 className="font-bold text-2xl"> Full Name </h1>
                <input
                  type="text"
                  defaultValue={formData.display_name}
                  className="bg-inherit"
                  name="displayName"
                  onChange={handleChange}
                />
              </div>
            </GradientDiv>
          </div>

          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <div className="p-10">
                <h1 className="font-bold text-2xl"> Email </h1>
                <p>
                  <input
                    type="email"
                    defaultValue={formData.email}
                    className="bg-inherit"
                    name="email"
                    onChange={handleChange}
                  />
                </p>
              </div>
            </GradientDiv>
          </div>

          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <div className="p-10">
                <h1 className="font-bold text-2xl">Password</h1>
                <div className="relative">
                  <input
                    type={type}
                    name="password"
                    id="password"
                    readOnly
                    defaultValue={formData.password}
                    className="bg-inherit"
                    onChange={handleChange}
                  />

                  <PasswordToggle
                    handlePasswordDisplay={handlePasswordDisplay}
                  />
                </div>
              </div>
            </GradientDiv>
          </div>

          <div className="w-full md:w-2/5">
            <GradientDiv col1="darkgray" col2="#dbf5b3" direction="to bottom">
              <div className="p-10">
                <Link to={"/dashboard/user_nft"}>
                  <h1 className="font-bold text-2xl">
                    View Your NFT's{" "}
                    <strong className="font-3xl"> &gt; &gt;</strong>
                  </h1>
                  <p>{nft.length}</p>
                </Link>
              </div>
            </GradientDiv>
          </div>
        </div>
      </div>
    </Container>
  );
}

const PasswordToggle = ({ handlePasswordDisplay }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      onClick={() => {
        handlePasswordDisplay();
        setToggle(!toggle);
      }}
      className="absolute right-0 bottom-0 px-4"
    >
      {toggle ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-6 h-6"
        >
          <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-6 h-6"
        >
          <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
        </svg>
      )}
    </div>
  );
};
