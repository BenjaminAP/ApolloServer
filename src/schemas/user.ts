import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { type } from "os";
import { Message } from "./message";

@ObjectType()
export class User {

    @Field(type => ID!)
    id: string;

    @Field()
    username: string;
    
    @Field(type => [Message])
    messages: Message[];
}