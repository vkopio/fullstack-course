import React from 'react'

const Books = ({ show, result, me }) => {
    if (!show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const currentUser = me.data.me
    const books = result.data.allBooks

    console.log(currentUser)


    const filteredBooks = books.filter(book =>
        book.genres.some(genre =>
            genre === currentUser.favoriteGenre
        )
    )

    return (
        <div>
            <h2>recommendations</h2>

            <p>books in your favorite genre <strong>{currentUser.favoriteGenre}</strong></p>

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
        </div>
    )
}

export default Books
