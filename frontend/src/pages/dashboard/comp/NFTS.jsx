import React, { useState } from "react";
import Container from "../../../components/Container";
import StyledCard from "../../../components/vendor/Card/StyledCard";
import { ReactComponent as Alien } from "../../../resources/images/dashboard/minted/reddit-alien.svg";
import { Link } from "react-router-dom";

export default function NFTS({ title, placeholder, datas, card_holder, path }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  React.useEffect(() => {
    setFilteredData(processArray(datas));
  }, [datas]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const processed = processArray(datas);
    const filtered = processed.filter((data) =>
      data.creator.toLowerCase().includes(query) || 
      data.collection_name?.toLowerCase().includes(query)
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

  return (
    <Container title={title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
           <div className="space-y-1 text-center md:text-left">
              <h2 className="text-4xl font-black tracking-tight gradient-text uppercase">{title}</h2>
              <p className="text-gray-500 font-medium">Discover unique digital assets on the frontier</p>
           </div>
           
           <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={placeholder}
                className="w-full bg-white/5 border-2 border-gray-100 dark:border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
           </div>
        </div>

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredData.map((data, index) => {
              return (
                <Link 
                  key={index} 
                  to={`/dashboard/nft/${data.id}?path=${path}`}
                  className="w-full flex justify-center"
                >
                  <StyledCard data={data} card_holder={card_holder} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-20 space-y-6">
            <div className="w-48 h-48 bg-gray-50 dark:bg-white/5 rounded-[3rem] flex items-center justify-center text-gray-300 dark:text-gray-700">
               <Alien className="w-32 h-32 opacity-20" />
            </div>
            <div className="text-center space-y-2">
               <h3 className="text-2xl font-black uppercase tracking-tight">Ethereal Silence</h3>
               <p className="text-gray-500 font-medium max-w-xs mx-auto">None of your assets currently match this discovery criteria.</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
