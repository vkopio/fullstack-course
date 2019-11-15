import React, { useState } from 'react'

const Login = ({ show, login, setToken, goToFrontPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (!show) {
        return null
    }

    const submit = async (e) => {
        e.preventDefault()

        try {
            const result = await login({
                variables: {
                    username,
                    password
                }
            })

            const token = result.data.login.value

            setToken(token)
            localStorage.setItem('user-token', token)

            setUsername('')
            setPassword('')
            goToFrontPage()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form onSubmit={submit}>
            <h2>Login</h2>

            <label>username</label>
            <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)} />

            <br />
            <label>password</label>
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)} />

            <br />
            <button type='submit'>Login</button>
        </form>
    )
}

export default Login
