import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toglable'
import BlogFrom from './components/BlogForm'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'

const Home = (props) => {
    const blogFormRef = React.createRef()

    if (props.user !== null) {
        return <>
            <h2>New blog</h2>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <BlogFrom formToggler={blogFormRef} />
            </Togglable>

            <Blogs />
        </>
    }

    return null
}

const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()
        props.initializeUser()
    }, [])

    return (
        <div>
            <Notification notification={props.notification} />

            <h1>Blogs</h1>
            <Login />

            <Router>
                <div>
                    <Route exact path="/" render={() => <Home user={props.user} />} />
                    <Route path="/users" render={() => <Users />} />
                </div>
            </Router>
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
    initializeBlogs,
    initializeUser,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp