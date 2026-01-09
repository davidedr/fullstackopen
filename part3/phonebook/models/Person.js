const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
console.log('Connecting to MongoDB...')
mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(res => console.log("Connected."))
    .catch(err => { console.log("Failed!", err); process.exit(-1)})
const PersonSchema = mongoose.Schema({ name: String, number: String })
const Person = mongoose.model("Person", PersonSchema)
module.exports = Person