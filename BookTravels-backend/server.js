const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000; // Change to your desired port

app.use(cors());

// Middleware to parse JSON data in requests
app.use(express.json());

app.post("/create/:userId", (req, res) => {
  const { userId } = req.params;

  // Load existing data or initialize as an empty array
  const filePath = path.join(__dirname, `${userId}.json`);

  // Check if username already exists
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");

    if (fileData) {
      res.status(403).json({ message: "User already exists" });
    }
  } catch (error) {
    const jsonString = JSON.stringify([], null, 2);

    // Write the JSON string to the file
    fs.writeFile("./data/", userId + ".json", jsonString, (err) => {
      if (err) {
        console.error("Error creating JSON file:", err);
      } else {
        console.log("Empty JSON file created successfully.");
      }
    });

    res.status(200).json({ message: "Userfile created successfully" });
  }
});

app.post("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const userData = req.body;

  // Load existing data or initialize as an empty array
  const filePath = path.join(__dirname, `${userId}.json`);
  let userArray = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    userArray = JSON.parse(fileData);
  } catch (error) {
    // File does not exist or is empty
  }

  // Push the new data to the array
  userArray.push(userData);

  // Write the updated array back to the file
  fs.writeFileSync(filePath, JSON.stringify(userArray, null, 2));

  res.status(200).json({ message: "Data saved successfully" });
});

// GET endpoint to retrieve user data
app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  // Load user data from the file
  const filePath = path.join(__dirname, `./data/${userId}.json`);
  let userArray = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    userArray = JSON.parse(fileData);
  } catch (error) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json(userArray);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});