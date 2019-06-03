import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import App from './App'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
    <ApolloHooksProvider client={client}>
        <App />
    </ApolloHooksProvider>,
    document.getElementById('root')
)
