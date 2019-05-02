import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')

    const countriesToShow = countries.filter(country =>
        country.name.toLowerCase().includes(countryFilter.toLowerCase())
    )

    const handleCountryFilterChange = (event) => {
        setCountryFilter(event.target.value)
    }

    const setCountryHandler = (countryName) => {
        return () => {
            setCountryFilter(countryName)
        }
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return (
        <div className="App">
            <Filter value={countryFilter} changeHandler={handleCountryFilterChange} />
            <Countries countries={countriesToShow} setCountryHandler={setCountryHandler} />
        </div>
    );
}

export default App;
