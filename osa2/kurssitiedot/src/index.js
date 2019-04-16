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

const Content = ({ parts }) => {
    const content = () => parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
    )

    return content()
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10,
                id: 1
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7,
                id: 2
            },
            {
                name: 'Komponenttien tila',
                exercises: 14,
                id: 3
            }
        ]
    }


    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
