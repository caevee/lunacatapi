const express = require("express");
const mongoose = require("mongoose");
const app = express();
const MONGOSECRET =
  process.env.MONGOSECRET || require(`${__dirname}/secrets.js`).MONGOSECRET;
const PORT = process.env.PORT || 3000;

mongoose.connect(
  `mongodb+srv://admin:${MONGOSECRET}@images.pdyfe.mongodb.net/cats?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const Cat = mongoose.model("Cat", { path: String, cat: String }, "images");

app.get("/", (req, res) => {
  res.send("Lunacat API. Use the /cat endpoint.");
});

app.get("/cat", (req, res) => {
  if (!req.query.cat) {
    Cat.find({}, (err, results) => {
      if (err) console.log(err);
      const randomDocument =
        results[Math.floor(Math.random() * results.length)];
      res.sendFile(`${__dirname}/images/${randomDocument.path}`);
    });
  } else {
    Cat.find({ cat: req.query.cat }, (err, results) => {
      if (err) console.log(err);
      const randomDocument =
        results[Math.floor(Math.random() * results.length)];
      res.sendFile(`${__dirname}/images/${randomDocument.path}`);
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on " + PORT);
});
