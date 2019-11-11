import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "./message";

@ObjectType()
export class User {

    @Field(type => ID!)
    public id!: string;

    @Field()
    public username!: string;
    
    @Field(type => [Message])
    public messages: Message[] | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}