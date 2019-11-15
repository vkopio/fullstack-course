import React, { useState, useEffect } from 'react'
import { Table } from 'semantic-ui-react'
import usersService from '../services/usersService'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService
            .getAll()
            .then(returnedUsers => setUsers(returnedUsers))
    }, [])

    const userTable = () => {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Blogs created</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(user => (
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.blogs.length}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }

    return (
        <div>
            <h2>Users</h2>
            {userTable()}
        </div>
    )
}

export default Users
