import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { User } from "../schemas/user";
import { UserService } from "../services/userService";

import uuid from 'uuid'

@Resolver(of => User)
export class UserResolver {

    constructor(private userService: UserService){}

    @FieldResolver() 
    public id(@Root() user: User) {
        return user.id;
    }

    @Query()
    public getUser(@Arg("username") username: string): User {
        return this.userService.getUser(username);
    }

    @Mutation(returns => User)
    public addUser(@Arg("name") name: string) {

        let user = new User;
        user.id = uuid();
        user.username = name;

        return this.userService.add(user);
            // .then(user => {
            //     return user;
            // })
            // .catch(err => {
            //     return err;
            // })
    }
}