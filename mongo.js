const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

if ( process.argv.length === 4 ) {
  console.log('missing name or phone number')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://enrique:${password}@cluster0-nlyii.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length === 5){
  const person = new Person({
    name: process.argv[3],
    phoneNumber: process.argv[4]
  })

  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}