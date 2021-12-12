
/*
 * -------------------------------------------------------
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
    abstract login(user?: Nullable<UserLoginInput>): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

    abstract signup(user?: Nullable<UserSignupInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract addUser(user?: Nullable<UserAddInput>): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    email: string;
    roles: UserRoles[];
    status: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class AuthPayload {
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export abstract class IQuery {
    abstract user(userId: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
