import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    const vote = (anecdoteObject) => {
        console.log('vote', anecdoteObject)
        props.voteAction(anecdoteObject)
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

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter)
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: anecdotesToShow(
            state.anecdotes,
            state.filter.toLowerCase()
        )
    }
}

const mapDispatchToProps = {
    voteAction,
    clearNotification,
}

const ConnectedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedList
