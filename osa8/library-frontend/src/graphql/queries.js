import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    id
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`
export const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`
