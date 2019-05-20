const listHelper = require('../utils/list_helper')

const blog1 = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}

const blog2 = {
    _id: '4a422aa71b54a676234d17f8',
    title: 'Console.log Statement Considered Harmful',
    author: 'Nobody',
    url: 'http://www.example.com/none',
    likes: 2,
    __v: 0
}

const listWithOneBlog = [blog1]
const listWithMultipleBlogs = [blog1, blog2]
const duplicateBlogs = [...listWithMultipleBlogs, blog2]

const simplifyBlog = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs equals their sum', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(7)
    })

    test('when list is empty, return zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    test('should return the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        const expected = simplifyBlog(blog1)

        expect(result).toEqual(expected)
    })

    test('should return the correct blog if only one in the list', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        const expected = simplifyBlog(blog1)

        expect(result).toEqual(expected)
    })

    test('should return an empty object if the list is empty', () => {
        const result = listHelper.favoriteBlog([])

        expect(result).toEqual({})
    })
})

describe('most blogs', () => {
    test('should return an author with most blogs', () => {
        const result = listHelper.mostBlogs(duplicateBlogs)
        const expected = {
            author: 'Nobody',
            blogs: 2
        }

        expect(result).toEqual(expected)
    })

    test('should behave correctly if only one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        const expected = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }

        expect(result).toEqual(expected)
    })

    test('should return an empty object if the list is empty', () => {
        const result = listHelper.mostBlogs([])

        expect(result).toEqual({})
    })
})
