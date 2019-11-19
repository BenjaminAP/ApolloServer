import { User } from "../schemas/user";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import { resolve } from "path";

@Service()
export class UserService {

    public add(nUser: User): Promise<User> {

        return new Promise((resolve, reject) => {
            try {
                const userRepo = getRepository(User);
                resolve(userRepo.save(nUser));
            } catch (err) {
                reject(err);
            }
            
        })
    }

    public getUsers(): Promise<User[]> {
        
        return new Promise((resolve, reject) => {
            try {
                const userRepo = getRepository(User);
                const usersList = userRepo.find();
                resolve(usersList);
            } catch (err) {
                reject(err);
            }
        }) 
        
    }

    public getByUsername(username: string): Promise<User[]> {

        return new Promise((resolve, reject) => {
            try {
                const userRepo = getRepository(User);
                const user = userRepo.find({username})
                resolve(user);
            } catch (err) {
                reject(err)
            }
        })
    }
}