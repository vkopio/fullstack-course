import React from 'react'

const Login = ({ username, setUsername, password, setPassword, handleLogin }) => {
    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                käyttäjätunnus
          <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                salasana
          <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
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
