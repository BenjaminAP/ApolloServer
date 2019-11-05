import { Service } from "typedi";
import { Message } from "../schemas/message";
import { User } from "../schemas/user";

@Service()
export class MessageService {
    private messageList: Array<Message> = [];

    public add(newMessage: Message): Message {
        this.messageList.push(newMessage);
        return newMessage
    }
}