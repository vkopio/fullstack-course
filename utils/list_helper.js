const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (mostLikesByFar, blog) => {
        return (mostLikesByFar.likes >= blog.likes)
            ? mostLikesByFar
            : blog
    }

    const mostLikes = blogs.reduce(reducer, {})

    delete mostLikes.url
    delete mostLikes._id
    delete mostLikes.__v

    return mostLikes
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    
    return _(blogs)
        .groupBy('author')
        .map((blogs, authorName) => {
            return {
                author: authorName,
                blogs: blogs.length
            }
        })
        .orderBy(['blogs'], ['desc'])
        .first()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
