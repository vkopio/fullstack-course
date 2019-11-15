import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
    const blogMock = {
        title: 'test',
        author: 'tester',
        url: 'http://test.test',
        likes: 5,
        user: {
            name: 'Root',
            username: 'root'
        }
    }

    const mockHandler = jest.fn()
    const mockRemoveHandler = jest.fn()

    let component

    beforeEach(() => {
        component = render(
            <Blog
                blog={blogMock}
                user={blogMock.user}
                handleBlogLike={mockHandler}
                handleBlogRemoval={mockRemoveHandler} />
        )
    })

    test('renders content', () => {
        expect(component.container).toHaveTextContent(
            `${blogMock.title}, ${blogMock.author}`
        )

        expect(component.container).toHaveTextContent(
            `${blogMock.likes} likes`
        )
    })

    test('clicking the like button calls event handler every time', async () => {
        const button = component.getByText('Like')

        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls.length).toBe(2)
    })

    test('renders without crashing', () => {
        const detailsDiv = component.container.querySelector('.details')

        expect(detailsDiv).toHaveStyle('display: none')

        const titleDiv = component.container.querySelector('.title')

        fireEvent.click(titleDiv)

        expect(detailsDiv).toHaveStyle('display: block')
    })
})
