import { UserService } from './../services/userService';
import { Message } from './../schemas/message';
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import { MessageService } from "../services/messageService";
import { User } from '../schemas/user';
import { TreeChildren } from 'typeorm';

@Service()
@Resolver(of => Message)
export class MessageRersolver {

    constructor(private messageService: MessageService, private userService: UserService){}

    @Mutation(returns => Message)
    public async addMessage(@Arg("txt") txt: string, @Arg("userId") userId: string): Promise<Message> {

        const newMsg = new Message();
        newMsg.user = new User();

        newMsg.message = txt;
        newMsg.user.id = userId;

        return await this.messageService.post(newMsg)
            .then(savedMsg => {

                console.log(`Message Resolver Success: ${savedMsg.toString()}`);
                return savedMsg; 
            }).catch(err => {
                console.log(`Message Resolver: ${err}`)
                return err
            })
    }
} 