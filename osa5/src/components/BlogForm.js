import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
    const newBlogFields = {
        title: useField('text'),
        author: useField('text'),
        url: useField('text'),
    }

    const newBlog = {
        title: newBlogFields.title.value,
        author: newBlogFields.author.value,
        url: newBlogFields.url.value,
    }

    const resetNewBlogFields = () => {
        newBlogFields.title.reset()
        newBlogFields.author.reset()
        newBlogFields.url.reset()
    }

    const hideBlogForm = () => props.blogFormRef.current.toggleVisibility()

    const addBlog = async (event) => {
        event.preventDefault()

        //hideBlogForm()
        resetNewBlogFields()

        props.createBlog(newBlog)
    }

    return (
        <Form onSubmit={addBlog}>
            <Form.Field>
                <h2>New blog</h2>
            </Form.Field>

            <Form.Field>
                <label>title</label>
                <input id="new-blog-title" {...newBlogFields.title.toForm()} />
            </Form.Field>

            <Form.Field>
                <label>author</label>
                <input id="new-blog-author" {...newBlogFields.author.toForm()} />
            </Form.Field>

            <Form.Field>
                <label>url</label>
                <input id="new-blog-url" {...newBlogFields.url.toForm()} />
            </Form.Field>

            <Form.Field>
                <Button primary id="new-blog-save" type="submit">Save</Button>
            </Form.Field>
        </Form>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    createBlog
}

const ConnectedBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm
