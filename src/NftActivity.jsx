import React, { useState, useEffect } from "react";

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

  // State for visibility and activity data
  const [isVisible, setIsVisible] = useState(true);
  const [activity, setActivity] = useState({
    action: getRandomElement(actions),
    name: getRandomElement(names),
    amount: getRandomFloat(1.0, 10.0),
  });

  useEffect(() => {
    const showDuration = 5000; // 5 seconds
    const getRandomHideDuration = () => (Math.random() * (5 - 1) + 1) * 60000; // 1-5 minutes in ms

    const cycleActivity = () => {
      setIsVisible(false);
      const hideDuration = getRandomHideDuration();

      setTimeout(() => {
        setActivity({
          action: getRandomElement(actions),
          name: getRandomElement(names),
          amount: getRandomFloat(1.0, 10.0),
        });
        setIsVisible(true);

        setTimeout(cycleActivity, showDuration);
      }, hideDuration);
    };

    const initialTimeout = setTimeout(cycleActivity, showDuration);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="p-3">
          <span className="font-semibold">{activity.name}</span> just{" "}
          {activity.action} an NFT at{" "}
          <span className="font-semibold text-green-800">
            {activity.amount}
          </span>{" "}
          ETH a few minutes ago.
        </div>
      )}
    </div>
  );
};

export default NftActivity;
