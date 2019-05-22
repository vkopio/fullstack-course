const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
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
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    expect(titles).toContain(helper.newBlog.title)
})

test('new blog has zero likes', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const addedBlog = await Blog.findOne({title: helper.newBlog.title})

    expect(addedBlog.likes).toBe(0)
})

test('a blog without a title and a url is not added', async () => {
    const badBlog = {
        author: 'Clueless'
    }

    await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    expect(blogs.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})
