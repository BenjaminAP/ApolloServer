import { User } from "../schemas/user";
import { Service } from "typedi";
import { getRepository } from "typeorm";

@Service()
export class UserService {
    public add(nUser: User): Promise<User> {

        return new Promise((resolve, reject) => {
            try {
                let repo = getRepository(User);
                resolve(repo.save(nUser));
            } catch (err) {
                reject(err);
            }
            
        })
    }

    public getUsers(): Promise<User[]> {
        
        return new Promise((resolve, reject) => {
            try {
                let repo = getRepository(User);
                const usersList = repo.find();
                resolve(usersList);
            } catch (err) {
                reject(err);
            }
        }) 
        
    }
}