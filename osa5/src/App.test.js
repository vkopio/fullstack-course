import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'

jest.mock('./services/blogs')

describe('<App />', () => {
    it('if no user logged, notes are not rendered', async () => {
        const component = render(
            <App />
        )

        await waitForElement(
            () => component.getByText('kirjaudu')
        )

        const blogs = component.container.querySelectorAll('.blog')

        expect(blogs.length).toBe(0)
    })

    it('renders all blogs it gets from backend', async () => {
        const user = {
            username: 'root',
            token: '1231231214',
            name: 'Root'
        }

        localStorage.setItem('user', JSON.stringify(user))

        const component = render(
            <App />
        )

        await waitForElement(
            () => component.container.querySelector('.blog')
        )

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(3)

        expect(component.container).toHaveTextContent(
            'test1'
        )
        expect(component.container).toHaveTextContent(
            'test2'
        )
        expect(component.container).toHaveTextContent(
            'test3'
        )
    })
})
