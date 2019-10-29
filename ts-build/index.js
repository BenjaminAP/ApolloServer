"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const uuid_1 = __importDefault(require("uuid"));
const app = express_1.default();
app.use(cors_1.default());
const usersList = [
    {
        id: 1,
        username: "Benjamin"
    }
];
const messages = [];
const schema = apollo_server_express_1.gql `
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
        messages: [Message]
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
            return usersList.filter(user => {
                if (user.id == args.id) {
                    return user;
                }
            });
        }
    },
    Mutation: {
        addUser: (parent, args) => {
            usersList.push({
                id: uuid_1.default(),
                username: args.username
            });
            return usersList;
        },
        postMessage: (parent, args) => {
            let newMessage = {
                id: uuid_1.default(),
                message: args.message,
                user: usersList.find(user => {
                    if (user.id == args.userId) {
                        return user;
                    }
                })
            };
            messages.push(newMessage);
            console.log(newMessage);
            return newMessage;
        }
    }
};
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: schema,
    resolvers,
});
apolloServer.applyMiddleware({
    app,
    path: '/'
});
app.listen({ port: 8000 }, () => {
    console.log(`Apollo server on http://localhost:8000/`);
});
//# sourceMappingURL=index.js.map