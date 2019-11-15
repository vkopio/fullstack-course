const initialState = {}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_NOTIFICATION':
            return initialState

        case 'NEW_NOTIFICATION':
            return action.data

        default:
            return state
    }
}

const newNotification = (notification) => {
    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: notification
        })

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}

const clearNotification = () => {
    return { type: 'CLEAR_NOTIFICATION' }
}

export const successNotification = (message) => {
    return newNotification({ message, type: 'success' })
}

export const errorNotification = (message) => {
    return newNotification({ message, type: 'error' })
}

export default notificationReducer
