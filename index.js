const cors = require('cors')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const uuidv4 = require('uuid/v4')

const app = express();
app.use(cors())

const usersList = [
    {
        id: 1,
        username: "Benjamin"
    }
]

const messages = []

const schema = gql`
    type Query {
        users: [User]
        user(id: ID): User
        messages: [Message]
    }

    type Mutation {
        addUser(username: String!): [User]
        postMessage(message: String!, userId: ID!): Message
    }

    type User {
        id: ID!
        username: String!
    }

    type Message {
        id: ID!
        message: String!
        user: User!
    }
`;

const resolvers = {
    Query: {
        users: () => usersList,
        user: (parent, args) => {
            return usersList.filter( user => {
                if (user.id == args.id) {
                    return user
                }
            })
        }
    },
    Mutation: {
        addUser: (parent, args) => {
            usersList.push({
                id: uuidv4(),
                username: args.username
            })

            return usersList
        },
        postMessage: (parent, args) => {

            let newMessage = {
                id: uuidv4(),
                message: args.message,
                user: usersList.find(user => {
                    if (user.id == args.userId) {
                        return user
                    }
                })
            }
            messages.push(newMessage)
            console.log(newMessage)

            return newMessage
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