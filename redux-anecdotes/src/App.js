import React from 'react'
import { voteAction, createAction } from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteAction(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value

    props.store.dispatch(createAction(anecdote))
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
