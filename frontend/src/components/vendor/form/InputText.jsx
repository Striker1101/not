import React from "react";

export default function InputText() {
  return (
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Email Address"
      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
