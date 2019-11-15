import React, { useState } from 'react'

const Books = ({ show, result }) => {
    const [genreFilter, setGenreFilter] = useState('')

    if (!show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const books = result.data.allBooks

    const getGenres = () => {
        const genres = {}

        books.forEach(book => {
            book.genres.forEach(genre => {
                genres[genre] = true
            })
        })

        return Object.keys(genres)
    }

    const genres = getGenres()

    const filteredBooks = genreFilter === ''
        ? books
        : books.filter(book => book.genres.some(genre => genre === genreFilter))

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {filteredBooks.map(book =>
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {genres.map(genre => (
                <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
            ))}
        </div>
    )
}

export default Books