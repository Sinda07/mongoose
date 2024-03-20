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

// Create and save a record
const createPerson = (name, age, favoriteFoods, done) => {
  const person = new Person({ name, age, favoriteFoods });
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Create many records
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Search database by name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Find one person by food
const findOnePersonByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Search database by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Update a person's favorite foods
const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

// Update a person's age by name
const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Delete one person by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Delete all people by name
const removeManyPeople = (name, done) => {
  Person.remove({ name: name }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOnePersonByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
};

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
