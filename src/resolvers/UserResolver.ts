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

    @Query(returns => [User])
    public async getUsers(): Promise<User> {
        return await this.userService.getUsers()
            .then(usersList => {
                console.log(usersList);
                return usersList;
            })
            .catch(err => {
                return err
            });
    }

    @Query(returns => [User])
    public async getByUsername(@Arg("username") username: string): Promise<User> {
        return await this.userService.getByUsername(username)
            .then(user => {
                console.log(user);
                return user
            })
            .catch(err => {
                return err
            });
    }

    @Mutation(returns => User)
    public async addUser(@Arg("username") name: string): Promise<User> {

        let user = new User();

        return await this.userService.post(user)
            .then(user => {
                console.log(user);
                return user
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }
}