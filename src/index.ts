import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { UserService } from './services/userService';
import { Container } from "typedi";

const app = express();
app.use(cors())

async function bootstrap() {
    let schema;
    const userService = new UserService();

    try {
        schema = await buildSchema({
            resolvers: [UserResolver],
            container: Container
        })
    } catch (err) {
        console.log(err);
    }
    
    const apolloServer = new ApolloServer({
        schema,
        playground: true
    });
    
    apolloServer.applyMiddleware({
        app
    });
    
    app.listen({port: 8000}, () => {
        console.log(`Apollo server on http://localhost:8000/`);
    });
}

bootstrap();