import React from 'react'

const Persons = ({ persons, removalHandler }) => {
    return persons.map(person =>
        <div key={person.name}>{person.name} {person.number}
            <button onClick={() => removalHandler(person)}>Poista</button>
        </div>
    )
}

export default Persons
