import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Message } from "./message";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn("uuid")
    @Field(type => ID!)
    public id!: string;

    @Column()
    @Field()
    public username!: string;
    
    @OneToMany(type => Message, messages => messages.user, { eager: true})
    @Field(type => [Message])
    messages: Promise<Message[]>;
}