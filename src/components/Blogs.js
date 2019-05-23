import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
    const blogList = blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )

    return (
        <div>
            {blogList}
        </div>
    )
}

export default Blogs
