import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Feedback = ({ handlers }) => {
    return (
        <>
            <h1>Anna palautetta</h1>
            <Button handleClick={handlers.good} text="Hyvä" />
            <Button handleClick={handlers.neutral} text="Neutraali" />
            <Button handleClick={handlers.bad} text="Huono" />
        </>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    return (
        <>
            <h1>Statistiikka</h1>
            <p>Hyvä: {good}</p>
            <p>Neutraali: {neutral}</p>
            <p>Huono: {bad}</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    const handlers = {
        good: () => setGood(good + 1),
        neutral: () => setNeutral(neutral + 1),
        bad: () => setBad(bad + 1)
    }

    return (
        <div>
            <Feedback handlers={handlers} good={good} neutral={neutral} bad={bad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
