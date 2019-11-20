import { resolve } from 'path';
import { getRepository } from 'typeorm';
import { Message } from './../schemas/message';
import { UserService } from './userService';
import { Repository } from 'typeorm';
import { Service } from "typedi";
import { User } from '../schemas/user';

@Service()
export class MessageService {

    private msgRepo: Repository<Message>;

    constructor(private userService: UserService) {
        this.msgRepo = getRepository(Message);
    }

    public post(msgToSave: Message): Promise<Message> {

        return new Promise((resolve, reject) => {

            try {

                const msgSaved = this.msgRepo.save(msgToSave)
                    .then(msg => {                         
                        return msg
                    })
                    .catch(err => {
                        return err;
                    })

                resolve(msgSaved);
                    
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }
}