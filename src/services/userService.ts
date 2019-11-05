import { User } from "../schemas/user";
import { Service } from "typedi";
import { resolve } from "url";
import { inherits } from "util";

@Service()
export class UserService {
    private users: Array<User> = [];

    public add(nUser: User): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                this.users.push(nUser);
                resolve(nUser);
            } catch (err) {
                reject(err);
            }
            
        })
    }

    public getUser(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                this.users.find(user => {
                    if (user.username === username) {
                        resolve(user);
                    }
                })
            } catch (err) {
                reject(err);
            }
        }) 
        
    }
}