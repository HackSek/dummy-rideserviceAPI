// imports
const express = require('express')
const routes = require('./requests')
const parser = require('body-parser')
const Mongoose = require('mongoose')

// setting up the app
const application = express()

// connecting to the database
Mongoose.connect('mongodb://localhost/rides')

// an additional line of code to fix the mongoose promise deprecation issue
Mongoose.Promise = global.Promise

// setting up parsing (first middleware)
application.use(parser.json())

// setting up routes (second middleware)
application.use('/api', routes)

// setting up error handling (third middleware)
application.use(function(error, request, response, nextMW) {
  response.status(404).send(error.message)
})

// listening to requests
application.listen(process.env.port || 5500, function() {
  console.log("listening")
})