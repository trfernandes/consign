import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsEstadoConstraint implements ValidatorConstraintInterface {
    estados: string[];
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage?(validationArguments?: ValidationArguments): string;
}
export declare function IsEstado(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
