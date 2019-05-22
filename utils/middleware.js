const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    logger.error(error)

    next(error)
}

module.exports = {
    errorHandler
}
