import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const filter = props.filter.toLowerCase()

    const anecdotesToShow = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter)
    )

    const vote = (anecdoteObject) => {
        console.log('vote', anecdoteObject)
        props.voteAction(anecdoteObject)

        setTimeout(() => props.clearNotification(), 5000)
    }

    return (
        <>
            {anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
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
