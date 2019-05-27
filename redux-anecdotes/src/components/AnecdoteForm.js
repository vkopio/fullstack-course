import React from 'react'
import { connect } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()

        const anecdote = event.target.anecdote.value

        props.createAction(anecdote)
        event.target.anecdote.value = ''

        setTimeout(() => props.clearNotification(), 5000)
    }

    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createAction,
    clearNotification,
}

const ConnectedForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedForm
