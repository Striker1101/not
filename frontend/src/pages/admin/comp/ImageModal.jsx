import React from "react";
import { Link } from "react-router-dom";

export default function ImageModal({
  showModal,
  setShowModal,
  selectedItem,
  setSelectedItem,
}) {
  function close() {
    setShowModal(false);
  }

  return (
    <div className="fixed inset-3 z-50 flex w-screen pt-[30px] h-screen items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-scroll">
      <div className="pt-32">
        <div className="relative mt-[40px] w-4/5 max-w-4xl mx-auto rounded shadow-lg overflow-hidden">
          <div className="flex justify-end">
            <button
              className="text-gray-600 hover:text-red-900 text-4xl "
              onClick={close}
            >
              ✕
            </button>
          </div>
        </div>
        <ul className="container flex flex-col w-full items-center justify-center">
          {selectedItem.map((item, index) => {
            return (
              <li key={index} className="w-4/5">
                <Link to={item} target="_blank">
                  <img src={item} className="w-4/5 h-60 rounded-3xl" alt="" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
