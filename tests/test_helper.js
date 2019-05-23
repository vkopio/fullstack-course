const Blog = require('../models/blog')
const User = require('../models/user')

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

const newBlog = {
    title: 'New Blog',
    author: 'Jest',
    url: 'https://example.com/new'
}

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

const initialUsers = [
    { username: 'root', password: 'thisisfine' }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    newBlog,
    nonExistingId,
    blogsInDb,
    initialUsers,
    usersInDb,
}
