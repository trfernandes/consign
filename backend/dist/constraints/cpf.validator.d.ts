import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsCpfConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
    isCpfValid(cpf: string): boolean;
}
export declare function IsCpf(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
