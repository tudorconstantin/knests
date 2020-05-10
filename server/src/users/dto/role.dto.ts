import { IsNotEmpty } from 'class-validator';

export class RoleDTO  {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    name: string;
}
