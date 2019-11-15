const blogs = [
    {
        id: '5a451df7571c224a31b5c8ce',
        title: 'test1',
        author: 'tester1',
        url: 'http://test.test/1',
        likes: 1,
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            name: 'Root',
            username: 'root'
        }
    },
    {
        id: '5a451e21e0b8b04a45638211',
        title: 'test2',
        author: 'tester2',
        url: 'http://test.test/2',
        likes: 2,
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            name: 'Root',
            username: 'root'
        }
    },
    {
        id: '5a451e30b5ffd44a58fa79ab',
        title: 'test3',
        author: 'tester3',
        url: 'http://test.test/3',
        likes: 3,
        user: {
            _id: '5a437a9e514ab7f168ddf138',
            name: 'Root',
            username: 'root'
        }
    },
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {

}

export default { getAll, setToken }
