import React from 'react'

const Country = ({ name }) => {
    return (
        <div>{name}</div>
    )
}

const CountryDetails = ({ country }) => {
    const languages = country.languages.map(language => 
        <li key={language.iso639_1}>{language.name}</li>
    )

    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>

            <h2>Languages</h2>
            <u>
                {languages}
            </u>

            <br />
            <img src={country.flag} alt="Flag" style={{maxWidth: "200px"}} />
        </div>
    )
}

const Countries = ({ countries }) => {
    if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]} />
        )
    } else if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else {
        return countries.map(country =>
            <Country key={country.alpha3Code} name={country.name} />
        )
    }
}

export default Countries
