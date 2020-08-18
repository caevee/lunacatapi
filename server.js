const express = require("express");
const zero_fill = require("zero-fill");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Lunacat API. Use the /random endpoint.");
});

app.get("/random", (req, res) => {
  const paddedNum = getPaddedNum();
  console.log(paddedNum);
  res.sendFile(`${__dirname}/images/p${paddedNum}.jpg`);
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});

const getRandomNum = (range) => {
  return Math.floor(Math.random() * range + 1);
};

const getPaddedNum = () => {
  const range = fs.readdirSync("./images").length;
  const randomNum = getRandomNum(range);
  return zero_fill(4, randomNum);
};
