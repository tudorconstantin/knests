import { IsNotEmpty, IsDateString } from 'class-validator';
import { _ } from 'lodash';

export class BaseDTO {
  @IsNotEmpty()
  @IsDateString()
  createdAt?: string;

  @IsNotEmpty()
  @IsDateString()
  updatedAt?: string;

  constructor(props) {
    // tslint:disable-next-line: forin
    for (const prop in props) {
      this[_.camelCase(prop)] = props[prop];
    }
  }
}