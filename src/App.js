import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const emptyBlog = {
    title: '',
    author: '',
    url: ''
  }

  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(emptyBlog)
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
      blogService.setToken(user.token)
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
      blogService.setToken(user.token)

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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()

    blogService
      .create(newBlog).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog(emptyBlog)
      })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title
      <br />
      <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
      />
      <br />
      author
      <br />
      <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
      />
      <br />
      url
      <br />
      <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
      />
      <br />
      <button type="submit">tallenna</button>
    </form>
  )

  return (
    <div>
      <Notification notification={notification} />

      <h1>Blogs</h1>

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

          <h2>New blog</h2>
          {blogForm()}

          <Blogs blogs={blogs} user={user} />
        </>}

    </div>
  )
}

export default App