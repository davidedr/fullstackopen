const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Missing pwd param");
    process.exit(-1)
}

//const user = 'fullstackopen'
const user = 'fullstackopen'
const password = process.argv[2]
const url = `mongodb+srv://${user}:${password}@cluster0.0ur2lvr.mongodb.net/?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)
const note = new Note({ content: 'HTML is easy', important: true, })
const newNote = new Note({ content: 'Mongo is OK', important: true, })

/*
 * NOT WORKING
 * save() are promises, they are parallel.
 * Conection could be closed BEFORE actual wrinting has happened
 *
console.log("Saving note...");
note.save().then(res => console.log('note saved!', res))

console.log("Saving newNote...");
newNote.save().then(res => {
    console.log('newNote saved!', res)
})
console.log("Connection closing...");
mongoose.connection.close()
console.log("Connection closed.");
*/

// Connection closing has to be done after all save operations are completed
Promise.all([note.save().then(res => console.log("note saved")), newNote.save().then(res => console.log("newNote saved"))]).then(res => {
    console.log("All notes saved");
    console.log("Connection closing...");
    mongoose.connection.close()
    console.log("Connection closed.");
})
