import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu, Button } from 'semantic-ui-react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toglable'
import BlogFrom from './components/BlogForm'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, logout } from './reducers/userReducer'

const Home = (props) => {
    const blogFormRef = React.createRef()

    if (props.user !== null) {
        return <>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <BlogFrom formToggler={blogFormRef} />
            </Togglable>

            <Blogs />
        </>
    }

    return null
}

const Navigation = (props) => {
    const handleLogout = () => {
        props.logout(props.user)
    }

    const userInfo = () => {
        if (props.user !== null) {
            return (
                <Menu.Item position='right'>
                    <Button onClick={handleLogout}>Logout {props.user.name}</Button>
                </Menu.Item>
            )
        }

        return null
    }

    return (
        <Menu>
            <Menu.Item as={Link} to="/" header>Blogs</Menu.Item>
            <Menu.Item as={Link} to="/users">Users</Menu.Item>

            {userInfo()}
        </Menu>
    )
}

const App = (props) => {
    useEffect(() => {
        props.initializeBlogs()
        props.initializeUser()
    }, [])

    return (
        <Container>
            <Router>
                <Navigation user={props.user} logout={props.logout} />
                <Notification notification={props.notification} />
                <Login />

                <div>
                    <Route exact path="/" render={() => <Home user={props.user} />} />
                    <Route path="/users" render={() => <Users />} />
                </div>
            </Router>
        </Container>
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
    logout,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp