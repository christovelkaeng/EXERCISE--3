// server.js

const express = require("express");
const morgan = require("morgan");
const members = require("./members");
const users = require("./users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/about", (req, res) => {
  const response = {
    Status: "success",

    Message: "response success",
    Description: "Exercise #03",

    Date: new Date().toISOString(),
    Data: members.getMembers(),
  };
  res.json(response);
});

app.get("/users", async (req, res) => {
  try {
    const userData = await users.getUsers();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});