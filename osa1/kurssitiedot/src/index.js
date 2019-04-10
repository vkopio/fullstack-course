import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = (props) => (
    <>
        <Part part={props.part1.name} exercises={props.part1.exercises} />
        <Part part={props.part2.name} exercises={props.part2.exercises} />
        <Part part={props.part3.name} exercises={props.part3.exercises} />
    </>
)

const Total = (props) => (
    <p>yhteensä {props.total} tehtävää</p>
)

const App = () => {
    const course = 'Half Stack -sovelluskehitys'

    const part1 = {
        name: 'Reactin perusteet',
        exercises: 10
    }

    const part2 = {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
    }

    const part3 = {
        name: 'Komponenttien tila',
        exercises: 14
    }


    return (
        <div>
            <Header course={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
