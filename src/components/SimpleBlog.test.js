import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
    const blogMock = {
        title: 'test',
        author: 'tester',
        url: 'http://test.test',
        likes: 5
    }

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
