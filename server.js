const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Person = require('./Model/person')
//connexion avec la base des donnes
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    err ? console.log(err) : console.log("database is connected")
});

var newPerson = new Person(
    {
        name: 'John',
        age:25,
        favoriteFoods:['pizza','kaftagi']
    }
);
newPerson.save(function(){
    console.log("person saved");
});

//Create Many Records with model.create()

let persons = [
    {
      name: "majdi",
      age: 26,
      favoriteFoods: ["pizza"],
    },
    {
      name: "hamma",
      age: 29,
      favoriteFoods: ["chawarma", "burritos"],
    },
    {
      name: "Mary",
      age: 25,
      favoriteFoods: ["ma9loub"],
    },
  ];
  Person.create(persons, function (err, data) {
    console.log(data);
  });
  
  //Use model.find() to Search Your Database
  
  Person.find({ name: "majdi" }, function (err, data) {
    console.log(data);
  });
  
  //Use model.findOne() to Return a Single Matching Document from Your Database
  
  function searchByFood(search) {
    Person.findOne({ favoriteFoods: { $regex: search } }, function (err, docs) {
      console.log(docs);
    });
  }
  searchByFood("burritos");
  
  //Use model.findById() to Search Your Database By _id
  
  function findByPersonId(personId) {
    Person.findById(personId, function (err, docs) {
      console.log(docs);
    });
  }
  findByPersonId("62c3468526e16a554e5fabc2");
  
  //Perform Classic Updates by Running Find, Edit, then Save
  
  function findPersonAndUpdate(personId) {
    Person.findById(personId, function (err, docs) {
      docs.favoriteFoods.push("hamburgr");
      docs.save().then((doc) => {
        console.log(doc);
      });
    });
  }
  
  findPersonAndUpdate("62c3468526e16a554e5fabc2");
  
  //Perform New Updates on a Document Using model.findOneAndUpdate()
  
  function findPersonAndUpdate(name) {
    Person.findOneAndUpdate(
      { name },
      { age: 49 },
      {
        new: true,
      }
    ).then((doc) => {
      console.log(doc);
    });
  }
  findPersonAndUpdate("hamma");
  
  //Delete One Document Using model.findByIdAndRemove
  
  function findPersonAndRemove(personId) {
    Person.findByIdAndRemove(personId).then((doc) => {
      console.log(doc);
    });
  }
  findPersonAndRemove("62c3468526e16a554e5fabc2");
  
  //MongoDB and Mongoose - Delete Many Documents with model.remove()
  
  Person.remove({ name: "Mary" }).then((data) => {
    console.log(data.deletedCount);
  });
  
  //Chain Search Query Helpers to Narrow Search Results
  
  function done(err, data) {
    console.log(data);
  }
  Person.find({ favoriteFoods: { $regex: "burritos" } })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(done);