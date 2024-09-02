import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsBrMobilePhoneConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
    isValidPhone: (phone: any) => boolean;
}
export declare function IsBrMobilePhone(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
