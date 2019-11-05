import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

import { User } from './user'
import { FilterRootFields } from "graphql-tools";

@ObjectType()
export class Message {
    @Field(type => ID!)
    id: string

    @Field({nullable: false})
    message: string

    @Field(type => ID!)
    userID: string
}