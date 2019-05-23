const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    switch (error.name) {
        case 'ValidationError':
            return response.status(400).json({ error: error.message })

        case 'JsonWebTokenError':
            return response.status(401).json({
                error: 'invalid token'
            })

        default:
            logger.error(error)
            next(error)
    }
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}
