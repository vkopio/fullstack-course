import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {
    const blogList = props.blogs.map(blog =>
        <Blog
            key={blog.id}
            blog={blog} />
    )

    return (
        <div>
            {blogList}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}

const ConnectedBlogs = connect(mapStateToProps)(Blogs)

export default ConnectedBlogs
