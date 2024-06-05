import React, { useState } from "react";
import Container from "../../../components/Container";
import StyledCard from "../../../components/vendor/Card/StyledCard";
import { ReactComponent as Alien } from "../../../resources/images/dashboard/minted/reddit-alien.svg";
import { Link } from "react-router-dom";

export default function NFTS({ title, placeholder, datas, card_holder, path }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(processArray(datas));

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = datas.filter((data) =>
      data.creator.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  function processArray(arr) {
    // Helper function to determine the file type
    function determineFileType(url) {
      const imageExtensions = [
        "jpeg",
        "jpg",
        "png",
        "gif",
        "bmp",
        "webp",
        "tiff",
      ];

      // Extract the part of the URL before the '?'
      const baseUrl = url.split("?")[0];

      // Extract the last four characters to get the file extension
      const fileExtension = baseUrl.slice(-4).toLowerCase();

      // Check if the extension matches any of the known image extensions
      const isImage = imageExtensions.some((ext) =>
        fileExtension.includes(ext)
      );

      return isImage ? "image" : "video";
    }

    // Process each object in the array
    return arr.map((obj) => {
      if (obj.fileUrls && obj.fileUrls.length > 0) {
        // Randomly pick a file URL
        const randomIndex = Math.floor(Math.random() * obj.fileUrls.length);
        const selectedUrl = obj.fileUrls[randomIndex];

        // Determine the file type
        const fileType = determineFileType(selectedUrl);

        // Add the content and type to the object
        return {
          ...obj,
          content: selectedUrl,
          type: fileType,
        };
      } else {
        // If there are no file URLs, return the object as is
        return obj;
      }
    });
  }
  console.log(filteredData);
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
            {filteredData.map((data, index) => {
              return (
                <li key={index} className="p-2 ">
                  <Link to={`/dashboard/nft/${data.id}?path=${path}`}>
                    <StyledCard data={data} card_holder={card_holder} />
                  </Link>
                </li>
              );
            })}
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
