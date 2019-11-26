import { User } from '../models/user';
import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOUser } from '../util/Userto-to-user';

//get username and password
export async function daoGetUserByUsernameAndPassword(username: string, password: string):Promise<User> {
    let client: PoolClient;
    try {
        client: await connectionPool.connect();
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles WHERE username = $1 and password = $2',
        [username, password])
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
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles')
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
      client &&  client.release()
    }
}




//get user by id 
export async function daoGetUserById(userId: number) {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM project0_reimbursement.users NATURAL JOIN project0_reimbursement.users_roles NATURAL JOIN project0_reimbursement.roles where user_id = $1')
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
            client && client.release ()
        }
    }
    export async function daoUpdateUser(newUser: User){
        let client: PoolClient
        try{
            client = await connectionPool.connect()
            client.query('BEGIN')
            await client.query('update project0_reimbursement.users SET username =$1, password =$2, firstname = $3, lastname = $4, email = $5 where user_id =$6',
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.userId]);
            await client.query('update project0_reimbursement.users_roles SET role_id = $1 where user_id = $2 ',
 [newUser.role, newUser.userId]);
            for( let role in newUser.role){
                await client.query('')
            }
            client.query('COMMIT')
        }catch(e){
            client.query('ROLLBACK')
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }finally{
            client.release()
        }
    }
    
    
    
    
    
    
    
    
    
    
    