import React from 'react'

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

const Total = ({ parts }) => {
    const accumulate = (sum, part) => sum + part

    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce(accumulate)

    return (
        <p>yhteensä {total} tehtävää</p>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Courses = ({ courses }) => {
    const courseList = courses.map(course =>
        <Course key={course.id} course={course} />
    )

    return courseList
}

export default Courses
