import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import peopleService from './services/people'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => {
        peopleService
            .getAll()
            .then(initialPeople => {
                setPersons(initialPeople)
            })
    }, [])

    const peopleToShow = persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )

    const resetPerson = () => {
        setNewName('')
        setNewNumber('')
    }

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }

        const existingPerson = persons.find(person => person.name === newName)

        if (existingPerson) {
            const confirmMessage = `${newName} on jo luettelossa. Korvataanko vanha numero uudella?`

            if (window.confirm(confirmMessage)) {
                peopleService
                    .update(existingPerson.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person =>
                            person.id !== existingPerson.id ? person : returnedPerson
                        ))
                    })
            }

            resetPerson()
            return
        }

        peopleService
            .create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                resetPerson()
            })
    }

    const removePerson = (id) => {
        peopleService
            .remove(id)
            .then(returnedNote => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                alert('Henkilö on jo valitettavasti poistettu palvelimelta')
                setPersons(persons.filter(person => person.id !== id))
            })
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

    const handlePersonRemoval = (person) => {
        if (window.confirm(`Poistetaanko ${person.name}?`)) {
            removePerson(person.id)
        }
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>

            <Filter value={nameFilter} changeHandler={handleNameFilterChange} />

            <h2>Lisää uusi</h2>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numerot</h2>
            <Persons persons={peopleToShow} removalHandler={handlePersonRemoval} />
        </div>
    )

}

export default App
