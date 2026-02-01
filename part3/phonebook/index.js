require('dotenv').config()
const Person = require('./models/Person')

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('test', (req, res) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :status :res[content-length] - :response-time ms :test'))

app.get('/api/persons', (req, res) => Person.find({}).then(persons => res.json(persons)))

app.get('/info', (req, res) => {
    Person.find({}).then(persons => res.send(`<h3>Phonebook has info for ${persons.length} people<br /><br />${new Date}</h3>`))
})

app.get('/api/persons/:id', (req, res) => {
    if (!req.params)
        return res.status(400).json({ error: "Not valid"})
    if (!req.params.id)
        return res.status(400).json({ error: "Not valid"})

    Person.findById(req.params.id).then(person => res.json(person))
})

app.delete('/api/persons/:id', (req, res, next) => {
    if (!req.params)
        return res.status(400).json({ error: "Not valid"})
    if (!req.params.id)
        return res.status(400).json({ error: "Not valid"})
    /*
    const person = persons.filter(person => person.id === req.params.id)
    if (!person || person.length === 0)
        return res.status(404).json({ error: "Not found"})
    */

    Person.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).send(result))
        .catch(err => next(err))
})

app.post('/api/persons', (req, res) => {
    if (!req.body)
        return res.status(400).json({ error: "Not valid"})
    if (!req.body.name || !req.body.number)
        return res.status(400).json({ error: "Name or number Not valid"})

    const newPerson = new Person({ name: req.body.name, number: req.body.number })
    newPerson.save()
        .then(person => res.json(person))
})

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === "CastError")
        return res.status(400).send({ error: "Malformed id"})
    next(err)
}
app.use(errorHandler)

PORT = process.env.PORT
app.listen(PORT, () => console.log(`Persons server listens to port ${PORT}`))