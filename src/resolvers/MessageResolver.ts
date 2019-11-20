import { Resolver } from "type-graphql";
import { Message } from "../schemas/message";
import { Service } from "typedi";
import { MessageService } from "../services/messageService";

@Service()
@Resolver(of => Message)
export class MessageRersolver {

    constructor(private messageService: MessageService){}

    // @Query(returns => Message)
    // public getMessages(userId: string): Message[] {

    //     return this.messageService.get
    // }
} 