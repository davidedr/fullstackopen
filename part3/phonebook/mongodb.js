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
    const phonebookEntrySchema = new mongoose.Schema({
        name: String,
        number: String,
    })
    const PhonebookEntryModel = mongoose.model('PhonebookEntry', phonebookEntrySchema)
    PhonebookEntryModel.find({})
        .then(res => {
            if (res.length > 0) {
                res.forEach(phonebookEntry => console.log(phonebookEntry.name, phonebookEntry.number, phonebookEntry.id))
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
    const phonebookEntrySchema = new mongoose.Schema({
        name: String,
        number: String,
    })
    const PhonebookEntryModel = mongoose.model('PhonebookEntry', phonebookEntrySchema)
    const newPhonebookEntry = new PhonebookEntryModel({ name, number })
    newPhonebookEntry.save()
        .then(res => {
            console.log(`added ${res.name} ${res.number} ${res.id} to phonebook`);
            process.exit(0)
        })
        .catch(err => {
            console.log(err);
            process.exit(0)
        })
}

