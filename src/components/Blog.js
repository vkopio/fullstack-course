import React, { useState } from 'react'

const Blog = ({ blog, user, handleBlogLike, handleBlogRemoval }) => {
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
        return user.username === blog.user.username ?
            (<p><button onClick={handleBlogRemoval(blog)}>Remove</button></p>) :
            null
    }

    return (
        <div style={blogStyle}>
            <div onClick={() => toggleDetails()}>
                {blog.title}, {blog.author}
            </div>
            <div style={showDetails}>
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

export default Blog