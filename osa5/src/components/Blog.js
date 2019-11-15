import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = (props) => {
    const blog = props.blog
    const [details, setDetails] = useState(false)

    const showDetails = { display: details ? '' : 'none' }

    const toggleDetails = () => {
        setDetails(!details)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const removeButton = () => {
        return props.user.username === blog.user.username ?
            (<p><button onClick={handleBlogRemoval(blog)}>Remove</button></p>) :
            null
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

    return (
        <div className="blog" style={blogStyle}>
            <div className="title" onClick={() => toggleDetails()}>
                {blog.title}, {blog.author}
            </div>
            <div className="details" style={showDetails}>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>
                    {blog.likes} likes <button onClick={handleBlogLike(blog)}>Like</button>
                </p>
                <p>Added by {blog.user.name}</p>
                {removeButton()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    likeBlog,
    removeBlog
}

const ConnectedBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)

export default ConnectedBlog
