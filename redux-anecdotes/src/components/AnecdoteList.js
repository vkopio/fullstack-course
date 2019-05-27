import React from 'react'
import { voteAction } from '../reducers/anecdoteReducer'
import { clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.store.getState().anecdotes

    const vote = (anecdoteObject) => {
        console.log('vote', anecdoteObject)
        props.store.dispatch(voteAction(anecdoteObject))

        setTimeout(() => props.store.dispatch(clearNotification()), 5000)
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}

        </>
    )
}

export default AnecdoteList
