import React, { useState } from 'react'

const Authors = ({ show, result, editAuthor }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const submit = async (e) => {
        e.preventDefault()

        await editAuthor({
            variables: {
                name,
                born: parseInt(born)
            }
        })

        setName('')
        setBorn('')
    }

    const renderAuthorOptions = () => {
        if (name === '') {
            setName(result.data.allAuthors[0].name)
        }

        return result.data.allAuthors.map(a =>
            <option key={a.id} value={a.name}>{a.name}</option>
        )
    }

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

            <h2>Set birth year</h2>

            <form onSubmit={submit}>
                <div>
                    <select onChange={({ target }) => {setName(target.value)}}>
                        {renderAuthorOptions()}
                    </select>
                </div>

                <div>
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default Authors