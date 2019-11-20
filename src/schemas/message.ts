import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

import { User } from './user'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
@ObjectType()
export class Message {

    @PrimaryGeneratedColumn('uuid')
    @Field(type => ID!)
    public id: string;

    @Column()
    @Field({nullable: false})
    public message: string;

    @ManyToOne(type => User, user => user.messages)
    @Field(type => User)
    public user!: User;

    public toString(): string {
        return( 
        `Message:
            id: ${this.id}
            message: ${this.message}
            user: 
                id: ${this.user.id}
                username: ${this.user.username}`
        )
    }
}