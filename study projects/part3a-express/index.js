/*
 * in this file handlers are deinfed in the correct order
 * https://fullstackopen.com/en/part3/saving_data_to_mongo_db#exercises-3-13-3-14
 */

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
morgan.token('test', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :status :res[content-length] - :response-time ms :test'))

let requestCounter = 0
const requestLogger = (req, res, next) => {
    requestCounter++
    console.log(`--Begin of request n. ${requestCounter}-----------------`)

    console.log('Method :', req.method)
    console.log('Path   :', req.path)
    console.log('Headers:', req.headers)
    if (req.body)
        console.log('Body   :', req.body)
    else
        console.log('No body')
    console.log(`--End of request n. ${requestCounter}-----------------`)
    next()
}

//app.use(requestLogger)

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
    //res.json(notes)
    Note.find({}).then(notes => res.json(notes))
})

app.get('/api/notes/:id', (req, res, next) => {
    console.log('params', req.params)

    Note.findById(req.params.id)
        .then(note => {
            if (note)
                res.json(note)
            else
                res.status(404).end()
        })
        .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
    console.log('params', req.params)

    if (!req.params || !req.params.id)
        next({ error: 'Missing param' })

    Note.findByIdAndDelete(res.params.id)
        .then(result => res.status(204).send(result))
        .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const { content, important } = req.body
    Note.findById(req.params.id)
        .then(note => {
            if (!note)
                return res.status(404).end()
            note.content = content
            note.important = important
            return note.save().then(updatedNote => res.json(updatedNote))
        })
        .catch(err => next(err))
})

app.post('/api/notes', (req, res, next) => {
    const body = req.body

    const newNote = new Note({ content: body.content, important: body.important || false })
    newNote.save()
        .then(savedNote => res.json(savedNote))
        .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidatioError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
// errorHandler must be the VERY LAST handler
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
})