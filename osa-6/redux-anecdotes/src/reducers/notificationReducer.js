const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR':
            return ''

        case 'VOTE':
            return `Voted anecdote "${action.data.content}"`

        case 'CREATE':
            return `Created anecdote "${action.data.content}"`

        default:
            return state
    }
}

export const clearNotification = () => {
    return { type: 'CLEAR' }
}

export default notificationReducer
