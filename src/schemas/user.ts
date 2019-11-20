import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "./message";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn("uuid")
    @Field(type => ID!)
    public id!: string;

    @Column()
    @Field()
    public username!: string;
    
    @OneToMany(type => Message, messages => messages.user)
    @Field(type => [Message])
    messages: Message[];
}