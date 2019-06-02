import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    id
    bookCount
  }
}
`

const Authors = (props) => {
    if (!props.show) {
        return null
    }

    const result = useQuery(ALL_AUTHORS)

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