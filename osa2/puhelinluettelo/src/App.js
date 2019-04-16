import React, { useState } from 'react'

const Persons = ({ persons }) => {
    return persons.map(person =>
        <div key={person.name}>{person.name}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName
        }

        setPersons(persons.concat(personObject))
        setNewName('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form onSubmit={addPerson}>
                <div>
                    nimi: <input value={newName} onChange={handleNameChange} />
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