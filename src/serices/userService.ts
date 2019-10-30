import { User } from "../schemas/user";

let users: User[];

export class UserService {

    add(user: User) {
        users.push(user);
        return user;
    }

    findByID(id: string) {
        return users.find( user => {
            if(user.id == id) {
                return users;
            }
        })
    }

    users() {
        return users;
    }
}