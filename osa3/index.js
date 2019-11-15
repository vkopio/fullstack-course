require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
const PORT = process.env.PORT || 3001

morgan.token('request-body', (req, res) => {
    if ((req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') && req.body) {
        return JSON.stringify(req.body)
    }
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))
app.use(express.static('build'))

const validatePerson = (body) => {
    let errors = []

    if (!body.name) {
        errors = [...errors, 'name missing']
    }

    if (!body.number) {
        errors = [...errors, 'number missing']
    }

    if (persons.some(person => person.name === body.name)) {
        errors = [...errors, 'name must be unique']
    }

    return errors
}

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const errors = validatePerson(body)

    if (errors.length > 0) {
        return response.status(400).json({
            errors: errors
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(res => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findOneAndUpdate({ _id: request.params.id }, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            console.log(person)
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
});

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const info = `<p>Puhelinluettelossa on ${persons.length} henkilön tiedot.</p>`
        const time = `<p>${new Date()}</p>`

        response.send(`${info}${time}`)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
