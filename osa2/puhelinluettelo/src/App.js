import React, { useState } from 'react'

const Persons = ({ persons }) => {
    return persons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '045-123456'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const resetPerson = () => {
        setNewName('')
        setNewNumber('')
    }

    const addPerson = (event) => {
        event.preventDefault()

        console.log(persons.filter(person => person.name === newName).length)

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} on jo luettelossa.`)
            resetPerson()
            return
        }

        const personObject = {
            name: newName,
            number: newNumber
        }

        setPersons(persons.concat(personObject))
        resetPerson()
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form onSubmit={addPerson}>
                <div>
                    nimi: <input value={newName} onChange={handleNameChange} />
                </div>

                <div>
                    numero: <input value={newNumber} onChange={handleNumberChange} />
                </div>

                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>

            <h2>Numerot</h2>
            <Persons persons={persons} />
    </div>
    )

}

export default App