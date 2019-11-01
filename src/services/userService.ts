import { User } from "../schemas/user";

let users: User[];

export class UserService {

    public add(user: User): User {
        users.push(user);
        return user;
    }

    public getUser(username: string): User {
        return users.find(user => {
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