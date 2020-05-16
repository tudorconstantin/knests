
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRoles {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL",
    ANONYMOUS = "ANONYMOUS"
}

export class UserLoginInput {
    email: string;
    password: string;
}

export class UserAddInput {
    email: string;
    roles: UserRoles[];
}

export class UserSignupInput {
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract login(user?: UserLoginInput): AuthPayload | Promise<AuthPayload>;

    abstract signup(user?: UserSignupInput): User | Promise<User>;

    abstract addUser(user?: UserAddInput): User | Promise<User>;
}

export class User {
    email: string;
    roles: UserRoles[];
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export class AuthPayload {
    token?: string;
    user?: User;
}

export abstract class IQuery {
    abstract user(userId: string): User | Promise<User>;
}
