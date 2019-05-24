import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleDetails()}>
        {blog.title}, {blog.author}
      </div>
      <div style={showDetails}>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes</p>
        <p>Added by {blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog