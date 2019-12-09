const morgan = require('morgan')

morgan.token('post', (request, response) => {
  if(request.method === 'POST'){
    return JSON.stringify(request.body)
  }
  return ' '
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({ errror: 'malformatted id' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).send({ errror: error.message })
  }

  next(error)
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler
}