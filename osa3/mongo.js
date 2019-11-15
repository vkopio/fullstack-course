const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const user = 'fullstack'
const password = process.argv[2]
const cluster = 'cluster0-2yzqd.mongodb.net'
const db = 'phone-book-app'
const options = '?retryWrites=true'
const url = `mongodb+srv://${user}:${password}@${cluster}/${db}${options}`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(response => {
        console.log(`lisätään ${person.name} numero ${person.number} luetteloon`);
        mongoose.connection.close();
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
