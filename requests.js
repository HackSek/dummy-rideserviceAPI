// Imports
const express = require('express')

// importing the "router" object
const router = express.Router()
const Car = require('../mongodb-models/rides')

// route handlers for the dummy "car ride" service API
// gets the list of cars nearby
router.get('/available-cars', function(request, response, nextMW) {
  console.log(parseFloat(request.query.lng))
  Car.geoNear({
    type: 'Point',
    coordinates: [parseFloat(request.query.lng), parseFloat(request.query.lat)]
  }, {
    maxDistance: 100000,
    spherical: true
  }).then(function(result) {
    console.log(result)
  })
})

// adds a new available car to the DB
router.post('/available-cars', function(request, response, nextMW) {
  Car.create(request.body).then(function(result) {
    response.send(result)
  }).catch(nextMW)
})

// updates the status of availability
router.put('/available-cars/:id', function(request, response, nextMW) {

  Car.findByIdAndUpdate({
    _id: request.params.id
  }, request.body).then(function() {
    Car.findOne({
      _id: request.params.id
    }).then(function(result) {
      response.send(result)
    })
  })
})

// deletes a car from the DB
router.delete('/available-cars/:id', function(request, response, nextMW) {
  Car.findByIdAndRemove({
    _id: request.params.id
  }).then(function(result) {
    response.send(result)
  })
})

module.exports = router