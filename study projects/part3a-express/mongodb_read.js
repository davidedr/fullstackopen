 mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Missing pwd param");
    process.exit(-1)
}

//const user = 'fullstackopen'
const user = 'fullstackopen'
const password = process.argv[2]
/*
 * Using this URL data is save into "test" (default?)db
 */
// const url = `mongodb+srv://${user}:${password}@cluster0.0ur2lvr.mongodb.net/?appName=Cluster0`

/*
 * Using this URL data is save into "NotesApp" db
 */
const url = `mongodb+srv://${user}:${password}@cluster0.0ur2lvr.mongodb.net/NotesApp?appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

/* Model: Note (singular nome)
 * Collection: notes (lowercase, plural nome; plural work automatically done by mongo)
 */
const Note = mongoose.model('Note', noteSchema)
Note.find({}).then(res => {
    console.log("Found", res.length, "notes:");
    res.forEach(note => console.log(note))
    console.log("Connection closing...");
    mongoose.connection.close()
    console.log("Connection closed.");
})