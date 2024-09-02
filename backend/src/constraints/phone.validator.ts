import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpfvalidator', async: false })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return this.isValidPhone(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Telefone inválido';
  }

  isValidPhone = (phone) => {
    const sanitizedPhone = phone.replace(/\D/g, '');
    return sanitizedPhone.length == 10;
  };
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    });
  };
}
