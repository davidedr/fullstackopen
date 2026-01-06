const express = require('express')
const app = express()

// The event handler function can access the data from the body property of the request object.
// Without the json-parser, the body property would be undefined.
// The json-parser takes the JSON data of a request, transforms it into a JavaScript object
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json())  // Adds the json parser

let requestCounter = 0
const requestLogger = (req, res, next) => {
    requestCounter++
    console.log(`--Begin of request n. ${requestCounter}-----------------`);
    
    console.log('Method :', req.method);
    console.log('Path   :', req.path);
    console.log('Headers:', req.headers);
    if (req.body)
        console.log('Body   :', req.body);
    else
        console.log("No body");
    console.log(`--End of request n. ${requestCounter}-----------------`);
    next()
}

app.use(requestLogger)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    console.log("params", req.params);

    const id = req.params.id
    const note = notes.find(note => note.id === id)
    if (note)
        res.json(note)
    else {
        res.statusMessage = "resource not found!"
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    console.log("params", req.params);

    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    if (!req.body.content)
        return res.status(400).json({error: 'content missing'})
    
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0
    const nextId = maxId + 1
    const note = {
        content: req.body.content, important: req.body.important || false, id: String(nextId)
    }
    notes = notes.concat(note)
    console.log(notes.map(note => note.id));
    
    res.json(note)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoit'})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
})