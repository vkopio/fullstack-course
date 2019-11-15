import React, { useState, useEffect } from 'react'
import { Subscription } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './graphql/queries'
import { CREATE_BOOK, EDIT_AUTHOR, LOGIN } from './graphql/mutations'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const BOOK_ADDED = gql`
subscription {
    bookAdded {
        title
        author {
            name
        }
        published
        genres
        id
    }
}
`

const App = () => {
    const client = useApolloClient()

    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('user-token')

        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    const handleError = (error) => {
        console.log(error)
        console.log(error.graphQLErrors)
        setErrorMessage(error.message)

        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const allAuthors = useQuery(ALL_AUTHORS)
    const allBooks = useQuery(ALL_BOOKS)
    const me = useQuery(ME)

    const addBook = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
    })

    const editAuthor = useMutation(EDIT_AUTHOR)
    const login = useMutation(LOGIN)

    const goToFrontPage = () => {
        setPage('authors')
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        goToFrontPage()
    }

    const loggedInMenu = () => {
        if (token) {
            return (<>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommendations')}>recommendations</button>
                <button onClick={() => logout()}>logout</button>
            </>)
        }

        return <button onClick={() => setPage('login')}>login</button>
    }

    return (
        <div>
            {errorMessage &&
                <div style={{ color: 'red' }}>
                    {errorMessage}
                </div>
            }

            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {loggedInMenu()}
            </div>

            <Login
                show={page === 'login'}
                login={login}
                setToken={setToken}
                goToFrontPage={goToFrontPage}
            />

            <Authors
                show={page === 'authors'}
                result={allAuthors}
                editAuthor={editAuthor}
                handleError={handleError}
            />

            <Books
                show={page === 'books'}
                result={allBooks}
            />

            <NewBook
                show={page === 'add'}
                addBook={addBook}
                handleError={handleError}
            />

            <Recommendations
                show={page === 'recommendations'}
                result={allBooks}
                me={me}
            />

            <Subscription
                subscription={BOOK_ADDED}
                onSubscriptionData={({ subscriptionData }) => {
                    alert(`A book named "${subscriptionData.data.bookAdded.title}" was added!`)
                }}
            >
                {() => null}
            </Subscription>

        </div>
    )
}

export default App
