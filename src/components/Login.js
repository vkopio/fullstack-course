import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login, logout } from '../reducers/userReducer'

const Login = (props) => {
    const username = useField('text')
    const password = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            await props.login(username.value, password.value)
        } catch (exception) {
            return
        }

        username.reset()
        password.reset()
    }

    const handleLogout = () => {
        props.logout(props.user)
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>Log in to application</h2>
            <div>
                käyttäjätunnus
                <input {...username.toForm()} />
            </div>
            <div>
                salasana
                <input {...password.toForm()} />
            </div>
            <button type="submit">kirjaudu</button>
        </form>
    )

    const userInfo = () => (
        <div>
            <p>{props.user.name} logged in</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )

    return (props.user === null) ? loginForm() : userInfo()
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    login,
    logout,
}

const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default ConnectedLogin
