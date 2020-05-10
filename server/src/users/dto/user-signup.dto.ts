import {UserSignupInput, UserRoles} from '../../graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSignupDTO extends UserSignupInput {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

}
