import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
    const blogList = blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )

    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.name} logged in</p>
            {blogList}
        </div>
    )
}

export default Blogs
