import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

const blogMock = {
    title: 'test',
    author: 'tester',
    url: 'http://test.test',
    likes: 5
}

test('renders content', () => {

    const component = render(
        <SimpleBlog blog={blogMock} />
    )

    expect(component.container).toHaveTextContent(
        `${blogMock.title} ${blogMock.author}`
    )

    expect(component.container).toHaveTextContent(
        `${blogMock.likes} likes`
    )
})

test('clicking the like button calls event handler every time', async () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blogMock} onClick={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})
