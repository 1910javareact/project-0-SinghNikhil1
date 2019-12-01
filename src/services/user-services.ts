import { User } from '../models/user';
import { daoGetUserByUsernameAndPassword, daoGetAlluser, daoGetUserById, daoUpdateUser } from '../repository/user-dao';

export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User>{
    try {
    return await daoGetUserByUsernameAndPassword(username, password)
} catch (e) {
    throw e
}
}

export async function getAllUser(): Promise<User[]> {
    try {
    return await daoGetAlluser()
} catch (e) {
    throw e
}
}

export async function getUserId(id: number):Promise<User> {
    try {
    return await daoGetUserById(id)
    } catch (e) {
        throw e
    }

}

export async function getUpdateUser(req: User){
    try{
        let user = await daoGetUserById(req.userId)
        for(let key in req){
            if(req[key] !== undefined && user.hasOwnProperty(key)){
                user[key] = req[key]
            }
        }
        await daoUpdateUser(user)
        return user
    }catch(e){
        throw e
    }
}









