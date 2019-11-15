import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'

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

    const loginForm = () => (
        <Form onSubmit={handleLogin}>
            <h2>Log in to application</h2>

            <Form.Field>
                <label>käyttäjätunnus</label>
                <input id='username' {...username.toForm()} />
            </Form.Field>

            <Form.Field>
                <label>salasana</label>
                <input id='password' {...password.toForm()} />
            </Form.Field>

            <Form.Field>
                <Button primary type="submit">kirjaudu</Button>
            </Form.Field>
        </Form>
    )

    return (props.user === null) ? loginForm() : null
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    login,
}

const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default ConnectedLogin
