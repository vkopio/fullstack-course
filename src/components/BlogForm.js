import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login, logout } from '../reducers/userReducer'

const BlogForm = (props) => {
    const newBlogFields = {
        title: useField('text'),
        author: useField('text'),
        url: useField('text'),
    }

    const newBlog = {
        title: newBlogFields.title.value,
        author: newBlogFields.author.value,
        url: newBlogFields.url.value,
    }

    const resetNewBlogFields = () => {
        newBlogFields.title.reset()
        newBlogFields.author.reset()
        newBlogFields.url.reset()
    }

    const hideBlogForm = () => props.blogFormRef.current.toggleVisibility()

    const addBlog = async (event) => {
        event.preventDefault()

        hideBlogForm()
        resetNewBlogFields()

        props.createBlog(newBlog)
    }

    return (
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
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    login,
    logout,
}

const ConnectedBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm
