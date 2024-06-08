import React, { useState } from "react";
import ImageModal from "./ImageModal";

const Table = ({ data, handleDelete, handleClick, collection, uid }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const keys = Object.keys(data[0]);
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full ">
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index} className="py-2 px-4 border">
                {key}
              </th>
            ))}
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-400">
              {keys.map((key, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`py-2 px-4 border ${
                    key === "status" ? "cursor-pointer text-blue-500" : ""
                  }`}
                >
                  {key === "status" ? (
                    <input
                      type="checkbox"
                      defaultChecked={item[key]}
                      onClick={(e) =>
                        handleClick(collection, uid, rowIndex, {
                          status: e.currentTarget.checked,
                        })
                      }
                    />
                  ) : typeof item[key] === "object" ? (
                    Array.isArray(item[key]) ? (
                      <img
                        src={item[key][0]}
                        alt=""
                        onClick={() => {
                          handleItemClick(item[key]);
                        }}
                      />
                    ) : (
                      <p>{new Date(item[key].seconds).toLocaleString()}</p>
                    )
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              <td className="py-2 px-4 border">
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => handleDelete(collection, rowIndex)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem.length > 0 && showModal ? (
        <ImageModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Table;
