import React, { useState } from 'react'

const Persons = ({ persons }) => {
    return persons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    const peopleToShow = persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )

    const resetPerson = () => {
        setNewName('')
        setNewNumber('')
    }

    const addPerson = (event) => {
        event.preventDefault()

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

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>

            <div>
                Rajaa näytettäviä: <input value={nameFilter} onChange={handleNameFilterChange} />
            </div>

            <h2>Lisää uusi</h2>

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
            <Persons persons={peopleToShow} />
        </div>
    )

}

export default App