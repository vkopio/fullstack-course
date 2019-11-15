const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const passwordUtil = require('../utils/password')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const getToken = async (user) => {
    const response = await api
        .post('/api/login')
        .send(user)

    return response.body.token
}

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const hash = await passwordUtil.createHash(helper.initialUsers[0].password)

    const user = new User({
        username: helper.initialUsers[0].username,
        passwordHash: hash
    })

    const savedUser = await user.save()

    const blogObjects = helper.initialBlogs.map(blog => new Blog({
        ...blog, user: savedUser._id
    }))
    const promiseBlogs = blogObjects.map(blog => blog.save())
    await Promise.all(promiseBlogs)

    token = await getToken({
        username: helper.initialUsers[0].username,
        password: helper.initialUsers[0].password
    })
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs have a field named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const blog = helper.newBlog
    const user = await User.findOne({ username: helper.initialUsers[0].username })

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)
    const addedBlog = await Blog.findOne({ title: helper.newBlog.title })

    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain(helper.newBlog.title)
    expect(addedBlog.user.toString()).toBe(user._id.toString())
})

test('new blog has zero likes', async () => {
    const blog = helper.newBlog
    const user = await User.findOne({ username: helper.initialUsers[0].username })

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const addedBlog = await Blog.findOne({ title: helper.newBlog.title })

    expect(addedBlog.likes).toBe(0)
})

test('a blog without a title and a url is not added', async () => {
    const badBlog = {
        author: 'Clueless'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(badBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    expect(blogs.length).toBe(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
    const blog = await Blog.findOne({ title: helper.initialBlogs[0].title })

    await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

    const blogs = await helper.blogsInDb()

    expect(blogs.length).toBe(helper.initialBlogs.length - 1)
})

test('a blog cannot be deleted if not the same user', async () => {
    const blog = await Blog.findOne({ title: helper.initialBlogs[0].title })

    await api
        .delete(`/api/blogs/${blog.id}`)
        .expect(401)

    const blogs = await helper.blogsInDb()

    expect(blogs.length).toBe(helper.initialBlogs.length)
})

test('a blog can be updated', async () => {
    const blog = await Blog.findOne({ title: helper.initialBlogs[0].title })

    const updatedAttributes = {
        url: 'https://test.test'
    }

    await api
        .patch(`/api/blogs/${blog.id}`)
        .send(updatedAttributes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const updatedBlog = await Blog.findOne({ title: helper.initialBlogs[0].title })

    expect(updatedBlog.url).toBe(updatedAttributes.url)
})

afterAll(() => {
    mongoose.connection.close()
})
