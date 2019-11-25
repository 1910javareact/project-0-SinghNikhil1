import { User } from '../models/User';
import { users } from '../database';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOUser } from '../util/Userto-to-user';
//get username and password 
export async function daoGetUserByUsernameAndPassword(username: string, password: string):Promise<User> {
    let client: PoolClient;
    try {
        client: await connectionPool.connect();
        const result = await client.query('')
        if (result.rowCount === 0) {
            throw 'Invalid Credential';
         } else {
             return userDTOtoUser(result.rows);
        }
    } catch (e) {
        console.log(e);
        if (e === 'Invalid credential'){

    throw{
        status: 401,
        message: 'Invalid credentials '
    }
    } else {
        throw {
            status: 500,
            message: 'Internal Server Error'
        };
    }
} finally {
    client && client.release();
} 
}


export async function daoGetAlluser(): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('')
        if (result.rowCount === 0) {
            throw 'No users in database'
        } else {
            return multiUserDTOUser(result.rows)
        }
    } catch (e) {
        if (e === 'No users in database') {
            throw{
                status: 400,
                message: 'No users in database'
            }
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            }
        }
    } finally {
        client.release()
    }
}




//get user by id 
export async function daoGetUserById(userId: number) {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('')
            if (result.rowCount === 0) {
                throw 'user does not exist'
            } else {
                return userDTOtoUser(result.rows)
            }
        } catch (e) {
            if (e === 'User does not exist'){
                throw{
                    status: 404,
                    message: 'User not found'
                }
            } else {
                throw{
                    status: 500,
                    message: 'Internal Server Error'
                }
            }
        } finally {
            client.release ()
        }
    }
export function daoUpdateUser(newUser: User) {
for (let u of users) {
    if (u.userId === newUser.userId) {
        u = newUser;
        return users;
    }
}
throw{
    status: 404,
    message: 'User not found'
}
}
