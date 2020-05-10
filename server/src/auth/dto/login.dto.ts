import {UserLoginInput} from '../../graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO extends UserLoginInput{

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
  
}