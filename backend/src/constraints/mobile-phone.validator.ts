import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpfvalidator', async: false })
export class IsBrMobilePhoneConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return this.isValidPhone(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Celular inválido';
  }

  isValidPhone = (phone) => {
    const sanitizedPhone = phone.replace(/\D/g, '');
    return sanitizedPhone.length >= 10 && sanitizedPhone.length <= 11;
  };
}

export function IsBrMobilePhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBrMobilePhoneConstraint,
    });
  };
}
