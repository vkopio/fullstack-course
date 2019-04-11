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

const Statistic = ({ text, value }) => (
    <p>
        {text}: {value}
    </p>
)

const Statistics = ({ good, neutral, bad, total, mean, positive }) => {
    if (total === 0) {
        return (
            <>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu.</p>
            </>
        )
    }

    return (
        <>
            <h1>Statistiikka</h1>
            <Statistic text="Hyvä" value={good} />
            <Statistic text="Neutraali" value={neutral} />
            <Statistic text="Huono" value={bad} />
            <Statistic text="Yhteensä" value={total} />
            <Statistic text="Keskiarvo" value={mean} />
            <Statistic text="Positiivisia" value={positive + " %"} />
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = () => good + neutral + bad

    const mean = () => {
        if (total() === 0) {
            return 0
        } else {
            return (good - bad) / total()
        }
    }

    const positive = () => {
        if (total() === 0) {
            return 0
        } else {
            return good / total() * 100
        }
    }

    const handlers = {
        good: () => setGood(good + 1),
        neutral: () => setNeutral(neutral + 1),
        bad: () => setBad(bad + 1)
    }

    return (
        <div>
            <Feedback handlers={handlers} good={good} neutral={neutral} bad={bad} />
            <Statistics good={good} neutral={neutral} bad={bad} total={total()} mean={mean()} positive={positive()} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
