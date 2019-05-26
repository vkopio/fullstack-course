import React from 'react'

const Login = ({ username, password, handleLogin }) => {
    const loginForm = () => (
        <form onSubmit={handleLogin}>
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

    return (
        <div>
            <h2>Log in to application</h2>
            {loginForm()}
        </div>
    )
}

export default Login
