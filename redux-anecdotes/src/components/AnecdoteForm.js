import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()

        const anecdote = event.target.anecdote.value

        props.store.dispatch(createAction(anecdote))
        event.target.anecdote.value = ''

        setTimeout(() => props.store.dispatch(clearNotification()), 5000)
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

export default AnecdoteForm
