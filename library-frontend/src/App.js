import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { ALL_AUTHORS, ALL_BOOKS } from './graphql/queries'
import { CREATE_BOOK, EDIT_AUTHOR } from './graphql/mutations'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleError = (error) => {
        console.log(error)
        setErrorMessage(error.graphQLErrors[0].message)

        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const allAuthors = useQuery(ALL_AUTHORS)
    const allBooks = useQuery(ALL_BOOKS)

    const addBook = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
    })

    const editAuthor = useMutation(EDIT_AUTHOR)

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
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors
                show={page === 'authors'}
                result={allAuthors}
                editAuthor={editAuthor}
            />

            <Books
                show={page === 'books'}
                result={allBooks}
            />

            <NewBook
                show={page === 'add'}
                addBook={addBook}
            />

        </div>
    )
}

export default App
