import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => (
    <>
        <p>
            {props.part1} {props.exercises1}
        </p>
        <p>
            {props.part2} {props.exercises2}
        </p>
        <p>
            {props.part3} {props.exercises3}
        </p>
    </>
)

const Total = (props) => (
    <p>yhteensä {props.total} tehtävää</p>
)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content part1={part2} part1={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
