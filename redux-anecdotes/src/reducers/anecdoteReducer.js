const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      return state
        .map(anecdote => anecdote.id === action.data.id ?
          { ...anecdote, votes: anecdote.votes + 1 } :
          anecdote
        )
        .sort((a, b) => (a.votes > b.votes) ? -1 : 1)

    case 'CREATE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const voteAction = (anecdoteObject) => {
  return {
    type: 'VOTE',
    data: anecdoteObject
  }
}

export const createAction = (anecdote) => {
  return {
    type: 'CREATE',
    data: asObject(anecdote)
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default anecdoteReducer
