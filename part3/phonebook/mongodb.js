const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Missing pwd param!");
    process.exit(-1);
}
const password = process.argv[2]

const user = "fullstackopen"
const url = `mongodb+srv://${user}:${password}@cluster0.0ur2lvr.mongodb.net/PhonebookApp?appName=Cluster0`

if (process.argv.length === 3) {
    // Read
    console.log("phonebook:");
    mongoose.set('strictQuery', false)
    mongoose.connect(url, { family: 4 })
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })
    const PersonModel = mongoose.model('Person', personSchema)
    PersonModel.find({})
        .then(res => {
            if (res.length > 0) {
                res.forEach(person => console.log(person.name, person.number, person.id))
                mongoose.connection.close()
                console.log("Connection closed.");
                process.exit(0)
            }
            else {
                console.log("No entries found.");
                process.exit(0)
            }
        })
        .catch(err => {
            console.log(err);
            process.exit(0)
        })
}
else {
    if (process.argv.length < 4) {
        console.log("Missing name param!");
        process.exit(-1);
    }

    if (process.argv.length < 5) {
        console.log("Missing number param!");
        process.exit(-1);
    }
    const name = process.argv[3]
    const number = process.argv[4]
    console.log(name, number);

    mongoose.set('strictQuery', false)
    mongoose.connect(url, { family: 4 })
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })
    const PersonModel = mongoose.model('Person', personSchema)
    const newPerson = new PersonModel({ name, number })
    newPerson.save()
        .then(res => {
            console.log(`added ${res.name} ${res.number} ${res.id} to phonebook`);
            process.exit(0)
        })
        .catch(err => {
            console.log(err);
            process.exit(0)
        })
}

