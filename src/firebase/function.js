// firebase/function.js
const functions = require("firebase-functions");
const axios = require("axios");

const sportmonksProxy = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.sportmonks.com/v3/football/fixtures",
      {
        params: {
          api_token: process.env.REACT_APP_SPORTMONK,
          include: "participants;odds",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default sportmonksProxy;
