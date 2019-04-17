import React from 'react'

const Filter = ({ value, changeHandler }) => (
    <div>
        Rajaa näytettäviä: <input value={value} onChange={changeHandler} />
    </div>
)

export default Filter
