const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test',
        author: 'Tester',
        url: 'https://example.com',
        likes: 2
    },
    {
        title: 'Test 2',
        author: 'Tester 2',
        url: 'https://example.com/2',
        likes: 6
    }
]

const nonExistingId = async () => {
    const blog = new Blog({})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
