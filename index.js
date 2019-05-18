const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

morgan.token('request-body', (req, res) => {
    if (req.method === 'POST' && req.body) {
        return JSON.stringify(req.body)
    }
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

const generateId = () => {
    return Math.floor(Math.random() * 10000000)
}

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const errors = validatePerson(body)

    if (errors.length > 0) {
        return response.status(400).json({
            errors: errors
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

app.get('/info', (req, res) => {
    const info = `<p>Puhelinluettelossa on ${persons.length} henkilön tiedot.</p>`
    const time = `<p>${new Date()}</p>`

    res.send(`${info}${time}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})