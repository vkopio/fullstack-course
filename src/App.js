import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import { successNotification, errorNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'

const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()

        const existingUser = window.localStorage.getItem('user')

        if (existingUser) {
            const user = JSON.parse(existingUser)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

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

            props.successNotification(`Welcome, ${user.name}!`)
        } catch (exception) {
            props.errorNotification('Wrong username or password')
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('user')

        setUser(null)
        props.successNotification(`Goodbye, ${user.name}!`)
    }

    const hideBlogForm = () => blogFormRef.current.toggleVisibility()

    const addBlog = async (event) => {
        event.preventDefault()

        hideBlogForm()
        resetNewBlogFields()

        props.createBlog(newBlog)
    }

    const handleBlogLike = (blog) => {
        return () => props.likeBlog(blog)
    }

    const handleBlogRemoval = (blog) => {
        return () => {
            if (window.confirm(`Do you want to remove blog: ${blog.title} by ${blog.author}?`)) {
                props.removeBlog(blog)
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
            <Notification notification={props.notification} />

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
                        blogs={props.blogs}
                        user={user}
                        handleBlogLike={handleBlogLike}
                        handleBlogRemoval={handleBlogRemoval} />
                </>}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        blogs: state.blogs,
    }
}

const mapDispatchToProps = {
    successNotification,
    errorNotification,
    initializeBlogs,
    createBlog,
    likeBlog,
    removeBlog,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp