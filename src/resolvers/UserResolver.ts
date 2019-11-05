import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import { User } from "../schemas/user";
import { UserService } from "../services/userService";

import uuid from 'uuid'
import { Service } from "typedi";

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(private userService: UserService){}

    @FieldResolver() 
    public id(@Root() user: User) {
        return user.id;
    }

    @Query(returns => User)
    public async getUser(@Arg("username") username: string): Promise<User> {
        return await this.userService.getUser(username)
            .then(user => {
                return user
            })
            .catch(err => {
                return err
            });
    }

    @Mutation(returns => User)
    public async addUser(@Arg("name") name: string): Promise<User> {

        let user = new User;
        user.id = uuid();
        user.username = name;

        return await this.userService.add(user)
            .then(user => {
                return user
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }
}