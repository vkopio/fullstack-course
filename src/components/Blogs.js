import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, handleBlogLike, handleBlogRemoval }) => {
    const blogList = blogs.map(blog =>
        <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleBlogLike={handleBlogLike}
            handleBlogRemoval={handleBlogRemoval} />
    )

    return (
        <div>
            {blogList}
        </div>
    )
}

export default Blogs
