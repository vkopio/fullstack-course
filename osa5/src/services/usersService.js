
import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        console.log(response.data)
        return response.data
    })
}

export default { getAll }
