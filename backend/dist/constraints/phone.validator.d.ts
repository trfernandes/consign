import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
    isValidPhone: (phone: any) => boolean;
}
export declare function IsPhone(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
