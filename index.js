require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('post', (req, res) =>{
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  return " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

/*
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-53223523",
    id: 4
  },
  {
    name: "Dan Amrabov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Peppendieck",
    number: "39-23-6423122",
    id: 4
  }
]
*/

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  })
})

app.get('/api/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log(persons)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number){
      return res.status(400).json({
        error: 'name or number is missing'
      })
    }

    if(persons.find(person => person.name === body.name)){
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: Math.floor((Math.random() * 100) % 100)
    }

    res.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})