import { User } from "../schemas/user";
import { Service } from "typedi";

@Service()
export class UserService {
    private users: Array<User> = [];

    public add(user: User): User {
        this.users.push(user);
        return user;
    }

    public getUser(username: string): User {
        return this.users.find(user => {
            return user.username === username;
        })
    }

    // add(user: User): Promise<User> {
    //      return new Promise((resolve, reject) => {
    //          users.push(user);
    //          resolve(user);
    //      })
    //  }

//    findByID(id: string): Promise<User> {
//         return new Promise((resolve, reject) => {
//             users.find( user => {
//                 if(user.id == id) {
//                     resolve(user);
//                 }
//             })
//         });
//     }

    // users(): Promise<User[]> {
    //     return new Promise((resolve, reject) => {
    //         resolve(users);
    //     })
    // }
}