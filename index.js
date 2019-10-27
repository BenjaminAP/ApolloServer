const cors = require('cors')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
app.use(cors())

const usersList = [
    {username: 'Benjamin Ace'},
    {username: 'TEst test'}
]

const schema = gql`
    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String!): [User]
    }

    type User {
        username: String!
    }
`;

const resolvers = {
    Query: {
        users: () => usersList
    },
    Mutation: {
        addUser: (parent, args) => {
            usersList.push({
                username: args.username
            })

            return usersList
        }
    }
};

const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

apolloServer.applyMiddleware({
    app,
    path: '/'
});

app.listen({port: 8000}, () => {
    console.log(`Apollo server on http://localhost:8000/`);
});