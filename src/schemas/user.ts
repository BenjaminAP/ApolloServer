import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "./message";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn("uuid")
    @Field(type => ID!)
    public id!: string;

    @Column()
    @Field()
    public username!: string;
    
    // @Field(type => [Message])
    // messages: Message[];
}