import loginService from '../services/login'
import blogService from '../services/blogs'
import { successNotification, errorNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data

        case 'LOGOUT':
            return null

        case 'INIT_USER':
            return action.data

        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('user', JSON.stringify(user))
            blogService.setToken(user.token)

            dispatch({
                type: 'LOGIN',
                data: user
            })

            dispatch(successNotification(
                `Welcome, ${user.name}!`
            ))
        } catch (error) {
            dispatch(errorNotification(
                'Wrong username or password'
            ))

            throw error
        }
    }
}

export const logout = (user) => {
    return async dispatch => {
        window.localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })

        dispatch(successNotification(
            `Goodbye, ${user.name}!`
        ))
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const existingUser = window.localStorage.getItem('user')

        if (existingUser) {
            const user = JSON.parse(existingUser)

            blogService.setToken(user.token)

            dispatch({
                type: 'INIT_USER',
                data: user,
            })
        }
    }
}

export default loginReducer
