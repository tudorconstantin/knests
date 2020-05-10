import { UserRoles } from '../../graphql';
import { IsEmail, IsNotEmpty, IsDateString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { BaseDTO } from '../../base.dto';

export class UserDTO extends BaseDTO {

  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Exclude()
  password?: string;

  @IsNotEmpty()
  roles!: UserRoles[];

  @IsNotEmpty()
  status: string;
}
