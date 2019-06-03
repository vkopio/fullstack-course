import React from 'react'

const Authors = ({ show, result }) => {
    if (!show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Born</th>
                        <th>Books</th>
                    </tr>

                    {result.data.allAuthors.map(a =>
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default Authors