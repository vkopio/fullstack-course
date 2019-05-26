import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({})
    const [user, setUser] = useState(null)

    const username = useField('text')
    const password = useField('password')

    const newBlogFields = {
        title: useField('text'),
        author: useField('text'),
        url: useField('text'),
    }

    const resetNewBlogFields = () => {
        newBlogFields.title.reset()
        newBlogFields.author.reset()
        newBlogFields.url.reset()
    }

    const newBlog = {
        title: newBlogFields.title.value,
        author: newBlogFields.author.value,
        url: newBlogFields.url.value,
    }

    const blogFormRef = React.createRef()

    const sortBlogs = (blogs) => blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(sortBlogs(blogs))
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
                username: username.value,
                password: password.value,
            })

            window.localStorage.setItem('user', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)

            username.reset()
            password.reset()

            newNotification({
                message: `Welcome, ${user.name}!`,
                type: 'success'
            })
        } catch (exception) {
            newNotification({
                message: 'Wrong username or password',
                type: 'error'
            })
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('user')

        newNotification({
            message: `Goodbye, ${user.name}!`,
            type: 'success'
        })

        setUser(null)
    }

    const addBlog = (event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()

        blogService
            .create(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                resetNewBlogFields()

                newNotification({
                    message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} created`,
                    type: 'success'
                })
            })
            .catch(error => {
                newNotification({
                    message: `${error.response.data.error}`,
                    type: 'error'
                })
            })
    }

    const likeBlog = (blog) => {
        blogService
            .like(blog)
            .then(returnedBlog => {
                setBlogs(sortBlogs(blogs.map(blog =>
                    blog.id === returnedBlog.id ?
                        returnedBlog :
                        blog)
                ))

                newNotification({
                    message: `Blog ${returnedBlog.title} was liked`,
                    type: 'success'
                })
            })
            .catch(error => {
                newNotification({
                    message: `${error.response.data.error}`,
                    type: 'error'
                })
            })
    }

    const removeBlog = (blogToRemove) => {
        blogService
            .remove(blogToRemove)
            .then(() => {
                setBlogs(blogs.filter(blog =>
                    blog.id !== blogToRemove.id)
                )

                newNotification({
                    message: `Blog ${blogToRemove.title} was deleted`,
                    type: 'success'
                })
            })
            .catch(error => {
                newNotification({
                    message: `${error.response.data.error}`,
                    type: 'error'
                })
            })
    }

    const handleBlogLike = (blog) => {
        return () => likeBlog(blog)
    }

    const handleBlogRemoval = (blog) => {
        return () => {
            if (window.confirm(`Do you want to remove blog: ${blog.title} by ${blog.author}?`)) {
                removeBlog(blog)
            }
        }
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
            title
            <br />
            <input {...newBlogFields.title.toForm()} />
            <br />
            author
            <br />
            <input {...newBlogFields.author.toForm()} />
            <br />
            url
            <br />
            <input {...newBlogFields.url.toForm()} />
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
                    password={password}
                    handleLogin={handleLogin} /> :

                <>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogout}>Logout</button>

                    <h2>New blog</h2>
                    <Togglable buttonLabel="New blog" ref={blogFormRef}>
                        {blogForm()}
                    </Togglable>

                    <Blogs
                        blogs={blogs}
                        user={user}
                        handleBlogLike={handleBlogLike}
                        handleBlogRemoval={handleBlogRemoval} />
                </>}

        </div>
    )
}

export default App