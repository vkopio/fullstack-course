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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
