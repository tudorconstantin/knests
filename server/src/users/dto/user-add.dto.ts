import {UserAddInput, UserRoles} from '../../graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserAddDTO extends UserAddInput {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roles: [UserRoles];

}
