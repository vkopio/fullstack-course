import blogService from '../services/blogs'
import { successNotification, errorNotification } from './notificationReducer'

const sortBlogs = (blogs) => blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'CREATE_BLOG':
            return state.concat(action.data)

        case 'UPDATE_BLOG':
            return sortBlogs(
                state.map(blog => blog.id === action.data.id ?
                    action.data :
                    blog
                )
            )

        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)

        case 'INIT_BLOGS':
            return sortBlogs(action.data)

        default:
            return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog)

            dispatch({
                type: 'CREATE_BLOG',
                data: newBlog
            })

            dispatch(successNotification(
                `A new blog ${newBlog.title} by ${newBlog.author} created`
            ))
        } catch (error) {
            dispatch(errorNotification(
                error.response.data.error
            ))
        }
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.like(blog)

            dispatch({
                type: 'UPDATE_BLOG',
                data: updatedBlog
            })

            dispatch(successNotification(
                `Blog ${updatedBlog.title} was liked`
            ))
        } catch (error) {
            dispatch(errorNotification(
                error.response.data.error
            ))
        }
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        try {
            await blogService.remove(blog)

            dispatch({
                type: 'REMOVE_BLOG',
                data: blog
            })

            dispatch(successNotification(
                `Blog ${blog.title} was removed`
            ))
        } catch (error) {
            dispatch(errorNotification(
                error.response.data.error
            ))
        }
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()

        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export default blogReducer
