import cors from 'cors';
import express from 'express';
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { UserService } from './services/userService';
import { Container } from "typedi";
import {createConnection} from "typeorm";
import { User } from './schemas/user';

const app = express();
app.use(cors())

async function bootstrap() {
    let schema;
    const userService = new UserService();

    //a ormconfig.json file can be used instead.... THINK ABOU IT.
    const connection = await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "dev",
        password: "msdev",
        database: "dev",
        entities: [User]
    });

    await connection.synchronize();

    // console.log(connection);

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
        console.log(`Apollo server on http://localhost:8000/graphql`);
    });
}

bootstrap();