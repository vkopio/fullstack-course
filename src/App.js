import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const existingUser = window.localStorage.getItem('user')

    if (existingUser) {
      const user = JSON.parse(existingUser)
      setUser(user)
    }
  }, [])

  const newNotification = (notification) => {
    setNotification(notification)

    setTimeout(() => {
      setNotification({})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      newNotification({
        message: 'käyttäjätunnus tai salasana virheellinen',
        type: 'error'
      })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification} />

      {(user === null) ?
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin} /> :

        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Blogs blogs={blogs} user={user} />
        </>}

    </div>
  )
}

export default App