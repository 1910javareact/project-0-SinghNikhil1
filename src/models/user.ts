import { role } from './role';

export class User {
    userId: number; // primary key
	username: string; // not null, unique
	password: string; // not null
	firstName: string; // not null
	lastName: string; // not null
	email: string; // not null
    roles: role[]; // not null
    constructor(userId: number, username: string, password: string, firstname: string, lastname: string, email: string, roles: role[]) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstname;
        this.lastName = lastname;
        this.email = email;
        this.roles = roles;

    }
}