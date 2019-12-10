import { User } from '../models/user';
import { UserDTO } from '../dtos/user-dto';

export function userDTOtoUser(uD: UserDTO[]): User {
const roles = [];
for (const u of uD) {
    roles.push({roleId: u.role_id,
                role: u.role_title
            })
}
return new User (
    uD[0].user_id,
    uD[0].user_name,
    uD[0].password,
    uD[0].first_name,
    uD[0].last_name,
    uD[0].email,
    roles);
}
export function multiUserDTOUser(uD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of uD) {
        if (currentUser.length === 0) {
            currentUser.push(u);
        } else if (currentUser[0].user_id === u.user_id) {
            currentUser.push(u);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}



