import React, { useState } from "react";
import { datas } from "../../utility/mintedData";
import Container from "../../components/Container";
import StyledCard from "../../components/vendor/Card/StyledCard";
import { ReactComponent as Alien } from "../../resources/images/dashboard/minted/reddit-alien.svg";
import { Link } from "react-router-dom";

const Minted = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(datas);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = datas.filter((data) =>
      data.creator.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  return (
    <Container title={"Minted NFT"}>
      <div className="minted-component mb-9">
        <div className="mx-5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Name of Creator "
            className="w-full bg-transparent border-transparent border-b-2 border-blue-200"
          />
        </div>

        {filteredData.length > 0 ? (
          <ul className="flex flex-wrap items-center justify-center">
            {filteredData.map((data, index) => (
              <li key={index} className="p-2 ">
                <Link to={`/dashboard/minted/${index}`}>
                  <StyledCard data={data} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center align-middle items-center h-full g-5 flex-wrap">
            <Alien width={300} height={300} className="text-2xl" />
            <p className="font-bold text-xl ml-9">NO NFT Here For You</p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Minted;
