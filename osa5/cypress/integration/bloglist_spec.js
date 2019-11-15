/// <reference types="Cypress" />

describe('Bloglist ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        window.localStorage.clear()
        const user = {
            name: 'Root',
            username: 'root',
            password: 'root'
        }

        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username')
                .type('root')
            cy.get('#password')
                .type('root')
            cy.contains('kirjaudu')
                .click()
        })

        it('greets the user', function () {
            cy.contains('Welcome, Root!')
        })

        it('user can add a blog', function () {
            cy.contains('New blog')
                .click()
            cy.get('#new-blog-title')
                .type('BlogTitle')
            cy.get('#new-blog-author')
                .type('BlogAuthor')
            cy.get('#new-blog-url')
                .type('BlogUrl')
            cy.get('#new-blog-save')
                .click()
            cy.contains('BlogTitle, BlogAuthor')
        })
    })
})
