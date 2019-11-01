import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';

const app = express();
app.use(cors())

async function bootstrap() {
    let schema;

    try {
        schema = await buildSchema({
            resolvers: [UserResolver]
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