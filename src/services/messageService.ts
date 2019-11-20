import { getRepository } from 'typeorm';
import { Message } from './../schemas/message';
import { UserService } from './userService';
import { Repository } from 'typeorm';
import { Service } from "typedi";
import { User } from '../schemas/user';

@Service()
export class MessageService {

    private msgRepo: Repository<Message>;
    private userRepo: Repository<User>;

    constructor(private userService: UserService) {
        this.msgRepo = getRepository(Message);
        this.userRepo = getRepository(User);
    }

    public post(msgToSave: Message): Promise<Message> {

        return new Promise((resolve, reject) => {

            try {

                this.userRepo.find(msgToSave.user)
                    .then((users: User[]) => {
                        msgToSave.user = users.find(user => {
                            return user.id === msgToSave.user.id;
                        })
                    })
                    .catch(err => {return err})
                
                const msgSaved = this.msgRepo.save(msgToSave)
                    .then(msg => {return msg})
                    .catch(err => {return err})

                resolve(msgSaved);
                    
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    }
}