import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as Knex from 'knex';
import { Injectable, Inject } from '@nestjs/common';
import { KNEX_CONNECTION } from '@libs/core/constants';
import { isEmpty } from '@libs/core/helpers';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(KNEX_CONNECTION) private connection: Knex) {}

  public async validate(
    value: string | string[],
    args: ValidationArguments,
  ): Promise<boolean> {
    if (isEmpty(value)) return false;

    const [{ table, column, caseInsensitive, where }] = args.constraints;

    if (caseInsensitive) {
      value = Array.isArray(value)
        ? value.map((v) => v.toLowerCase())
        : value.toLowerCase();
    }

    const query = this.connection(table);
    Array.isArray(value)
      ? query.whereIn(column, value)
      : query.where(column, value);

    if (where) query.where(where);

    const result = await query.count({ count: '*' });
    const record = result.first() || {};
    const count = +record['count'];
    return Array.isArray(value) ? !!!(value.length === count) : !!!count;
  }

  defaultMessage(args: ValidationArguments) {
    const [options] = args.constraints;
    return `${options.column} already exists.`;
  }
}

export function IsUnique(
  options: Record<string, any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
