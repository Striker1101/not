import React, { useState } from "react";
import Container from "../../../components/Container";
import StyledCard from "../../../components/vendor/Card/StyledCard";
import { ReactComponent as Alien } from "../../../resources/images/dashboard/minted/reddit-alien.svg";
import { Link } from "react-router-dom";

export default function NFTS({ title, placeholder, datas, card_holder, path }) {
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

  console.log(filteredData, datas);
  return (
    <Container title={title}>
      <div className="minted-component mb-9">
        <div className="mx-5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={placeholder}
            className="w-full bg-transparent border-transparent border-b-2 border-blue-200"
          />
        </div>

        {filteredData.length > 0 ? (
          <ul className="flex flex-wrap items-center justify-center">
            {filteredData.map((data, index) => (
              <li key={index} className="p-2 ">
                <Link to={`/dashboard/nft/${index}?path=${path}`}>
                  <StyledCard data={data} card_holder={card_holder} />
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
}
