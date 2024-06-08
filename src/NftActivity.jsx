import React from "react";

const NftActivity = () => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hank",
    "Ivy",
    "Jack",
    "Kara",
    "Liam",
    "Mona",
    "Nate",
    "Olivia",
    "Pete",
    "Quincy",
    "Rita",
    "Sam",
    "Tina",
    "Uma",
    "Vince",
    "Wendy",
    "Xander",
    "Yara",
    "Zane",
    "Ava",
    "Blake",
    "Cara",
    "Dylan",
    "Ella",
    "Finn",
    "Gina",
    "Harry",
    "Isla",
    "Jake",
    "Kate",
    "Leo",
    "Mia",
    "Noah",
    "Oscar",
    "Paula",
    "Quinn",
    "Rose",
    "Sara",
    "Tom",
    "Ursula",
    "Victor",
  ];

  const actions = ["bought", "sold"];

  // Helper function to get a random element from an array
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Helper function to get a random float between min and max
  const getRandomFloat = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(2);

  const action = getRandomElement(actions);
  const name = getRandomElement(names);
  const amount = getRandomFloat(1.0, 10.0);

  return (
    <div>
      <div className="p-3">
        <span className="font-semibold"> {name}</span> just {action} an NFT at{" "}
        <span className="font-semibold text-green-800">{amount}</span> ETH a few
        minutes ago.
      </div>
    </div>
  );
};

export default NftActivity;
