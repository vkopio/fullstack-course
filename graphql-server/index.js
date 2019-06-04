const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongodb = require('./src/mongodb')
const Book = require('./src/models/book')
const Author = require('./src/models/author')

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

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
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
    },

    Author: {
        bookCount: async (root) => Book.find({ author: root._id }).countDocuments(),
    },

    Mutation: {
        addBook: async (root, args) => {
            if (books.find(book => book.title === args.title)) {
                throw new UserInputError('The book already exists', {
                    invalidArgs: args.title,
                })
            }

            const newAuthor = new Author({ name: args.author })
            const existingAuthor = await Author.findOne({ name: args.author })

            const author = existingAuthor
                ? existingAuthor
                : await newAuthor.save()

            const book = new Book({ ...args, author })

            return book.save()
        },

        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo

            return author.save()
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongodb.connect()

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
