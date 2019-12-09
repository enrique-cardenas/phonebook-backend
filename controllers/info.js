const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})

module.exports = infoRouter