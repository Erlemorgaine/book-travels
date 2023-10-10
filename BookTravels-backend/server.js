const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000; // Change to your desired port

app.use(cors());

// Middleware to parse JSON data in requests
app.use(express.json());

app.get("/create/:userId", (req, res) => {
  const { userId } = req.params;

  // Load existing data or initialize as an empty array
  const filePath = path.join(__dirname, `./data/users/${userId}.json`);
  const templatePath = path.join(
    __dirname,
    `./data/template/book-template-28563829.json`
  );

  // Check if username already exists
  try {
    const userData = fs.readFileSync(filePath, "utf-8");
    const userJson = JSON.parse(userData);

    res.status(200).json(userJson);
  } catch (error) {
    const template = fs.readFileSync(templatePath, "utf-8");
    const jsonTemplate = JSON.parse(template);

    // Write the JSON string to the file
    fs.writeFile(`./data/users/${userId}.json`, template, (err) => {
      if (err) {
        console.error("Error creating JSON file:", err);
      } else {
        console.log("Empty book template created successfully.");
      }
    });

    res.status(200).json(jsonTemplate);
  }
});

app.post("/user/:userId", updateBook);

app.put("/user/:userId", updateBook);

// GET endpoint to retrieve user data
app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  // Load user data from the file
  const filePath = path.join(__dirname, `./data/users/${userId}.json`);
  let countriesWithBooks = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    countriesWithBooks = JSON.parse(fileData);
  } catch (error) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json(countriesWithBooks);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function updateBook(req, res) {
  const { userId } = req.params;
  const userData = req.body;

  // Load existing data or initialize as an empty array
  const filePath = path.join(__dirname, `./data/users/${userId}.json`);
  let countriesWithBooks = [];

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    countriesWithBooks = JSON.parse(fileData);
  } catch (error) {
    // File does not exist or is empty
  }

  // Push the new data to the array
  const currentData = countriesWithBooks.find(
    (data) => data.code === userData.countryCode
  );

  if (currentData) {
    console.log("CURRENT DATA");
    currentData.writer = userData.writer;
    currentData.book = userData.book;
    currentData.read = userData.read;
  }

  // Write the updated array back to the file
  fs.writeFileSync(filePath, JSON.stringify(countriesWithBooks, null, 2));

  res.status(200).json(countriesWithBooks);
}
