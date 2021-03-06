const passwordUtil = require('../utils/password')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.password || body.password.length < 3) {
            return response.status(400).json({ error: 'password is too short, min length is 3' })
        }

        const passwordHash = await passwordUtil.createHash(body.password)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
