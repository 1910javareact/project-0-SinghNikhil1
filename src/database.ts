import { User } from './models/User';

export let users: User[] = [{
userId: 1,
username: 'Finance Manager',
password: 'password',
firstName: 'Nikhil',
lastName: 'Singh',
email: 'nikhlsingh797@gmail.com',
role:
{
    roleId: 1,
    role: 'Finance Manager',
}
},
{
    userId: 2,
    username: 'Admin',
    password: 'password',
    firstName: 'Vinayak',
    lastName: 'Gupta',
    email: 'Vinayakgupta797@gmail.com',
role:
    {
        roleId: 2,
        role: 'Admin',
    },
}];