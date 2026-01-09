require('dotenv').config()
// It's important that dotenv gets imported BEFORE the note model is imported.
// This ensures that the environment variables from the .env file are available globally
// before the code from the other modules is imported
const Note = require('./models/Note')

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

// The event handler function can access the data from the body property of the request object.
// Without the json-parser, the body property would be undefined.
// The json-parser takes the JSON data of a request, transforms it into a JavaScript object
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json())  // Adds the json parser

const morgan = require('morgan')
morgan.token('test', (req, res) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :status :res[content-length] - :response-time ms :test'))

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

//app.use(requestLogger)

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
    //res.json(notes)
    Note.find({}).then(notes => res.json(notes))
})

app.get('/api/notes/:id', (req, res) => {
    console.log("params", req.params);

    Note.findById(req.params.id)
        .then(note => {
            if (note)
                res.json(note)
            else
                res.status(404).end()
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({ error: err })
        })
})

app.delete('/api/notes/:id', (req, res) => {
    console.log("params", req.params);

    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    if (!req.body.content)
        return res.status(400).json({ error: 'content missing' })

    /*
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0
    const nextId = maxId + 1
    const note = {
        content: req.body.content, important: req.body.important || false, id: String(nextId)
    }
    notes = notes.concat(note)
    console.log(notes.map(note => note.id));

    res.json(note)
    */
    const newNote = new Note({ content: req.body.content, important: req.body.important || false })
    newNote.save()
        .then(savedNote => res.json(savedNote))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoit' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
})