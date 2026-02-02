const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
console.log('Connecting to MongoDB...')
mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(res => console.log("Connected."))
    .catch(err => { console.log("Failed!", err); process.exit(-1) })
const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },

    }
})
const Person = mongoose.model("Person", PersonSchema)
module.exports = Person