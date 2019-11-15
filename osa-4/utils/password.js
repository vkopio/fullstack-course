const bcrypt = require('bcrypt')

const saltRounds = 10

const createHash = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

const compare = async (password, user) => {
    const isCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    return isCorrect
}

module.exports = {
    createHash,
    compare
}
