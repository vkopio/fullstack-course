const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongodb = require('./src/mongodb')
const Book = require('./src/models/book')
const Author = require('./src/models/author')
const User = require('./src/models/user')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String]!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }
    
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int
        ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    } 
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const bookFilter = {}

            if (args.author) {
                const author = await Author.findOne({ name: args.author })

                if (!author) {
                    return []
                }
            }

            if (args.genre) {
                bookFilter.genres = { $in: [args.genre] }
            }

            return Book.find(bookFilter).populate('author')
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        },
    },

    Author: {
        bookCount: async (root) => Book.find({ author: root._id }).countDocuments(),
    },

    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const existingBook = await Book.findOne({ title: args.title })

            if (existingBook) {
                throw new UserInputError('The book already exists', {
                    invalidArgs: args.title,
                })
            }

            const existingAuthor = await Author.findOne({ name: args.author })
            const newAuthor = new Author({ name: args.author })

            if (!existingAuthor) {
                try {
                    await newAuthor.save()
                } catch (error) {
                    console.log(error)
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            const author = existingAuthor
                ? existingAuthor
                : newAuthor

            const book = new Book({ ...args, author })

            try {
                await book.save()
            } catch (error) {
                console.log(error)
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },

        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                console.log(error)
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        },

        createUser: (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
})

mongodb.connect()

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
