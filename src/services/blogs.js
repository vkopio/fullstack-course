
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const remove = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
}

const like = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const likes = {
    likes: blog.likes + 1
  }

  const request = axios.patch(`${baseUrl}/${blog.id}`, likes, config)
  return request.then(response => response.data)
}

export default { getAll, create, remove, like, setToken }
