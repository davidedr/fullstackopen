const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const url = process.env.MONGODB_URI
console.log('Connecting...', url);

mongoose.connect(url, { family: 4 })
    .then(res => console.log("Connected to mongodb"))
    .catch(err => console.log("Error",err.message))

const noteSchema = mongoose.Schema({ content: String, important: Boolean})

// Removes id and _v from toJSON output
/*
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
*/

const Note = mongoose.model("Note", noteSchema)
module.exports = Note