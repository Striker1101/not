// src/admin/Index.js
import React, { useEffect, useState } from "react";
import { getCollection } from "../../firebase/firestore";
import Modal from "./comp/Modal";

export default function Index() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    balance: null,
    email: null,
    id: null,
    password: null,
    profit: null,
    uid: null,
    updated_at: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getCollection();
      if (fetchedData.status === 200) {
        setData(fetchedData.data);
        setFilteredData(fetchedData.data);
      } else {
        alert(fetchedData.data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) =>
      item?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
  }, [searchTerm, data]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  function removeObjectByPropValue(arr, prop, value, check) {
    return arr.filter((obj) => obj[prop] !== check);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Index Data</h1>
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded text-black"
      />
      <ul className="list-disc pl-5">
        {removeObjectByPropValue(
          filteredData,
          "uid",
          "YvAAxZB4rXOr9pZM5XgYNBjLyO53",
          "YvAAxZB4rXOr9pZM5XgYNBjLyO53"
        ).map((item) => {
          return (
            <li
              key={item.id}
              className="m-2 cursor-pointer p-2"
              onClick={() => handleItemClick(item)}
            >
              <div>
                {item.name}
                {item.email} - Updated At:{" "}
                {new Date(item.updated_at.seconds * 1000).toLocaleString()}
              </div>
            </li>
          );
        })}
      </ul>
      {selectedItem.uid ? (
        <Modal
          showModal={showModal}
          setSelectedItem={setSelectedItem}
          setShowModal={setShowModal}
          selectedItem={selectedItem}
        />
      ) : (
        ""
      )}
    </div>
  );
}
