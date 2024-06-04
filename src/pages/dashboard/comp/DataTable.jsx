import React, { useState, useEffect } from "react";

const DataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, data]);

  const headers = data.length ? Object.keys(data[0]) : [];

  return (
    <div className="container mx-auto p-7 overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-2 bg-blue-500 text-white p-2 rounded">
          Total: {filteredData.length}
        </button>
      </div>
      <table className="min-w-full bg-white dark:bg-background-dark border dark:border-gray-600">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="py-2 px-4 border-b border-gray-200 dark:border-gray-600"
                >
                  {renderCellContent(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

function renderCellContent(value) {
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return (
        <img
          src={value[0]} // Assuming the first element of the array is the image URL
          alt=""
          width={50}
          className="rounded-2xl"
        />
      );
    } else {
      return new Date(value.seconds).toDateString(); // Assuming it's a Firestore timestamp
    }
  } else if (typeof value === "boolean") {
    return value ? <span>Completed</span> : <span>Pending</span>;
  } else {
    return value; // For other types, just display the value as it is
  }
}
