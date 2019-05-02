import React from 'react'

const Filter = ({ value, changeHandler }) => (
    <div>
        Find countries: <input value={value} onChange={changeHandler} />
    </div>
)

export default Filter
