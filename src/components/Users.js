import React, { useState, useEffect } from 'react'
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
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
