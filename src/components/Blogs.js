import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleBlogLike }) => {
    const blogList = blogs.map(blog =>
        <Blog 
        key={blog.id} 
        blog={blog}
        handleBlogLike={handleBlogLike} />
    )

    return (
        <div>
            {blogList}
        </div>
    )
}

export default Blogs
