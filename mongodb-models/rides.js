// imports
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// creating a Schema for the location of a specific car
var locationSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dssphere"
  }
})

// creating a Schema for available cars
var CarSchema = new Schema({
  car: {
    type: String,
    required: [true, '"car" is a necessary piece of data']
  },
  model: {
    type: String,
    required: [true, '"model" is a necessary piece of data']
  },
  driver: {
    type: String,
    required: [true, 'the "driver" is a necessary piece of data']
  },
  availability: {
    type: Boolean,
    default: false
  },
  // embedding the location Schema
  geometry: locationSchema
})

// creating a car Model
var Car = Mongoose.model('rides', CarSchema)

module.exports = Car