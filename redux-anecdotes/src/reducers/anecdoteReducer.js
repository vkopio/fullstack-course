import anecdoteService from '../services/anecdotes'

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return sortAnecdotes(
        state
          .map(anecdote => anecdote.id === action.data.id ?
            action.data :
            anecdote
          )
      )

    case 'CREATE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data)

    default:
      return state
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.patch({ ...anecdote, votes: anecdote.votes + 1 })

    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, 5000)
  }
}

export const createAction = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)

    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, 5000)
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
