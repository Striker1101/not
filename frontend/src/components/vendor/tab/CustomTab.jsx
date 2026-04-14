import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {React.Children.map(children, (child, index) => (
          <div
            className={`cursor-pointer py-2 px-4 text-sm font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      <div className="p-4">{children[activeTab]}</div>
    </div>
  );
};

const Tab = ({ children }) => <div>{children}</div>;

export { Tabs, Tab };
