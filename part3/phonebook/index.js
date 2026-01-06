let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const MAX_ID=1E10

const express = require('express')
const app = express()
app.use(express.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<h3>Phonebook has info for ${persons.length} people<br /><br />${new Date}</h3>`)
})

app.get('/api/persons/:id', (req, res) => {
    if (!req.params)
        return res.status(400).json({ error: "Not valid"})
    if (!req.params.id)
        return res.status(400).json({ error: "Not valid"})
    const person = persons.filter(person => person.id === req.params.id)
    if (!person || person.length === 0)
        return res.status(404).json({ error: "Not found"})
    res.json(person[0])
})

app.delete('/api/persons/:id', (req, res) => {
    if (!req.params)
        return res.status(400).json({ error: "Not valid"})
    if (!req.params.id)
        return res.status(400).json({ error: "Not valid"})
    const person = persons.filter(person => person.id === req.params.id)
    if (!person || person.length === 0)
        return res.status(404).json({ error: "Not found"})
    persons = persons.filter(person => person.id !== req.params.id)
    res.status(202).end()
})

app.post('/api/persons', (req, res) => {
    console.log('POST /api/persons');
    console.log(req.body);
       
    
    if (!req.body)
        return res.status(400).json({ error: "Not valid"})
    const person = {
        id: String(Math.floor(Math.random()*MAX_ID)), name: req.body.name, number: req.body.number
    }
    persons = [...persons, person]
    res.json(person)
})

PORT = 3001
app.listen(PORT, () => console.log(`Server listens to port ${PORT}`))