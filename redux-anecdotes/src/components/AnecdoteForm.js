import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const createAnecdote = (event) => {
        event.preventDefault()

        const anecdote = event.target.anecdote.value

        props.store.dispatch(createAction(anecdote))
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={createAnecdote}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
    )
}

export default AnecdoteForm
