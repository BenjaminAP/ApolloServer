import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../schemas/user";
import { UserService } from "../serices/userService";

import uuid from 'uuid'

@Resolver(User)
export class UserResolver {

    constructor(private userService: UserService){}

    @Mutation(returns => User)
    addUser(@Arg("name") name: string): User {

        let user = new User;
        user.id = uuid();
        user.username = name;

        return this.userService.add(user);
    }

    @Query(returns => [User])
    async getUsers() {
        return this.userService.users();
    }
}