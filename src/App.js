import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toglable'
import { useField } from './hooks'
import { successNotification, errorNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogsReducer'
import { initializeUser, login, logout } from './reducers/userReducer'

const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()
        props.initializeUser()
    }, [])

    const user = props.user

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
            await props.login(username.value, password.value)
        } catch (exception) {
            return
        }

        username.reset()
        password.reset()
    }

    const handleLogout = () => {
        props.logout(user)
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
        user: state.user,
    }
}

const mapDispatchToProps = {
    successNotification,
    errorNotification,
    initializeBlogs,
    createBlog,
    likeBlog,
    removeBlog,
    initializeUser,
    login,
    logout,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp