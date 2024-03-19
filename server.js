const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/person");
require("dotenv").config();

const app = express();
const PORT = 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

const arrayofPeople = [
  { name: "Alice", age: 30, favoriteFoods: [Pasta] },
  { name: "Paul", age: 25, favoriteFoods: [Pizza] },
];

Person.create(arrayofPeople, function (err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log(people);
  }
});
Person.find({ name: "John Doe" }, function (err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log(people);
  }
});

Person.findOne({ favoriteFoods: "Sushi" }, function (err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log(person);
  }
});

const personId = "";
Person.findById(personId, function (err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log(person);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
