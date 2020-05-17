import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

import * as bcrypt from 'bcrypt';
import { UserSignupDTO } from './dto/user-signup.dto';
import { User, UserRoles } from '../graphql';
import { plainToClass, classToPlain } from 'class-transformer';
import { UserDTO } from './dto/user.dto';

interface DBRoles {
    [UserRoles.ADMIN]: string;
    [UserRoles.NORMAL]: string;
    [UserRoles.ANONYMOUS]: string;
}
@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    @Inject(KNEX_CONNECTION) private readonly knex;

    async findOne(email: string): Promise<UserDTO | undefined> {
        const [user] = await this.knex('users').where({ email });

        return user;
    }

    async findById(id: string): Promise<User | undefined> {
        const [user] = await this.knex('users').where({ user_id: id });
        return plainToClass(User, user);
    }


    async create(user: UserDTO): Promise<UserDTO | undefined> {
        const pwd = await this.hashPassword(user.password);
        const [createdUser] = await this.knex('users').insert({
            email: user.email,
            password: pwd,
        }).returning('*');

        const res = new UserDTO(createdUser);
        return res;
    }

    /**
     * The first user signing up will also have the ADMIN role. The rest of them, only the NORMAL role.
     * @param user :UserSignupDTO
     */
    async signup(user: UserSignupDTO): Promise<UserDTO | undefined> {

        try {
            const [total] = await this.knex('users').count();
            const signupRoles = [UserRoles.NORMAL];

            if (parseInt(total.count, 10) === 0) {
                signupRoles.push(UserRoles.ADMIN);
            }
            const newUser = await this.create(new UserDTO(classToPlain(user)));


            // adding Roles
            const adminUser = await this.addRolesToUser(newUser, signupRoles);

            const res = new UserDTO(classToPlain(adminUser));

            return res;
        } catch (e) {
            this.logger.debug(e);
            throw e;
        }

    }

    async addRolesToUser(user: UserDTO, roles: UserRoles[]): Promise<User> {

        const dbRoles = await this.getRoles();
        for (const roleCode of roles) {
            const roleId = dbRoles[roleCode];

            const dbRole = {
                user_id: user.userId,
                role_id: roleId,
            };
            const alreadyHasRole = await this.knex('users_roles').where(dbRole).count();
            if (!alreadyHasRole) {
                await this.knex('users_roles').insert(dbRole).returning('*');
            }
            user.roles = user.roles || [];
            user.roles.push(roleCode);
        }

        return user;
    }

    async hashPassword(plainTextPass: string): Promise<string> {
        const saltRounds = process.env.SALT_ROUNDS || 13;

        const hashedPass = await bcrypt.hash(plainTextPass, saltRounds);

        return hashedPass;
    }

    async getRoles(): Promise<DBRoles | undefined> {
        const roles = await this.knex('roles').select('*');
        const res = {} as DBRoles;
        for (const role of roles) {
            res[role.code] = role.role_id;
        }
        return res;
    }
}
