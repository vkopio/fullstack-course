const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User(helper.initialUsers[0])
        await user.save()
    })

    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')

        expect(response.body.length).toBe(helper.initialUsers.length)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'tester',
            name: 'Test Tester',
            password: 'thisisfinetoo',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('same username cannot be used', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            password: 'thisisfinetoo',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('when invalid input is given', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('too short username is rejected', async () => {
        const newUser = {
            username: 'r',
            password: 'thisisfinetoo',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(0)
    })

    test('too short password is rejected', async () => {
        const newUser = {
            username: 'testing',
            password: 't',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(0)
    })

    test('username is required', async () => {
        const newUser = {
            password: 'thisisfinetoo',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(0)
    })

    test('password is required', async () => {
        const newUser = {
            username: 'testing',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
