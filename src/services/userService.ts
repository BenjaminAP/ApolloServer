import { User } from "../schemas/user";
import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";

@Service()
export class UserService {
    private userRepo;

    constructor(){
        this.userRepo = getRepository(User);
    }

    public post(nUser: User): Promise<User> {

        return new Promise((resolve, reject) => {
            try {
                resolve(this.userRepo.save(nUser));
            } catch (err) {
                reject(err);
            }
            
        });
    }

    public getUsers(): Promise<User[]> {
        
        return new Promise((resolve, reject) => {
            try {
                resolve(this.userRepo.find());
            } catch (err) {
                reject(err);
            }
        })
    }

    public getByUsername(username: string): Promise<User[]> {

        return new Promise((resolve, reject) => {
            try {
                resolve(this.userRepo.find({username}));
            } catch (err) {
                reject(err)
            }
        })
    }

    public getById(userId: string): Promise<User> {
        
        return new Promise((resolve, reject) => {

            try {
                resolve(this.userRepo.find({userId}));
            } catch(err) {
                reject(err);
            }
        })
    }
}