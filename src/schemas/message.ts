import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

import { User } from './user'
import { FilterRootFields } from "graphql-tools";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { MessageService } from "../services/messageService";

@Entity()
@ObjectType()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID!)
    id: string;

    @Column()
    @Field({nullable: false})
    message: string;

    @ManyToOne(type => User, user => user.messages)
    @Field(type => User)
    user!: User;
}