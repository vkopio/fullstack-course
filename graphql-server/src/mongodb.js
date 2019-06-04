const mongoose = require('mongoose')
const config = require('./utils/config')

const connect = () => {
    mongoose.set('useFindAndModify', false)

    console.log('connecting to MongoDB')

    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
        .then(() => {
            console.log('connected to MongoDB')
        })
        .catch((error) => {
            console.log('error connection to MongoDB:', error.message)
        })
}

module.exports = { connect }
