import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toglable'
import BlogFrom from './components/BlogForm'
import { successNotification, errorNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'

const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()
        props.initializeUser()
    }, [])

    const blogFormRef = React.createRef()

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

    return (
        <div>
            <Notification notification={props.notification} />

            <h1>Blogs</h1>
            <Login />

            {(props.user === null) ?
                null :
                <>
                    <h2>New blog</h2>
                    <Togglable buttonLabel="New blog" ref={blogFormRef}>
                        <BlogFrom formToggler={blogFormRef} />
                    </Togglable>

                    <Blogs
                        blogs={props.blogs}
                        user={props.user}
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
    likeBlog,
    removeBlog,
    initializeUser,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp