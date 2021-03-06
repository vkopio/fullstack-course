const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })

    response.json([...blogs])
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        const savedBlogWithUser = await Blog.find(savedBlog).populate('user', { username: 1, name: 1 })

        response.status(201).json(savedBlogWithUser)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)

        if (user.id.toString() === blog.user.toString()) {
            await Blog.findByIdAndDelete(blog.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'you are not the author of this blog' })
        }

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.patch('/:id', async (request, response, next) => {
    const body = request.body

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { $set: body }, { new: true })

        response.status(200).json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter
