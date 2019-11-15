const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    number: {
        type: String,
        required: true,
        minlength: 8,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema)
