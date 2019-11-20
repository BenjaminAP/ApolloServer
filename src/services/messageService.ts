import { Repository } from 'typeorm';
import { Service } from "typedi";
import { Message } from "../schemas/message";

@Service()
export class MessageService {
    
    // constructor(private messageRepo: Repository<Message>)

    // public add(newMessage: Message): Message {
    //     return new Promise((resolve, reject) => {
    //         resolve();
    //     })
    // }
}