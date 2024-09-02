"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEstadoConstraint = void 0;
exports.IsEstado = IsEstado;
const class_validator_1 = require("class-validator");
let IsEstadoConstraint = class IsEstadoConstraint {
    constructor() {
        this.estados = [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO',
        ];
    }
    validate(value, validationArguments) {
        return this.estados.includes(value.toUpperCase());
    }
    defaultMessage(validationArguments) {
        return 'O Estado é inválido';
    }
};
exports.IsEstadoConstraint = IsEstadoConstraint;
exports.IsEstadoConstraint = IsEstadoConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsEstadoConstraint);
function IsEstado(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEstadoConstraint,
        });
    };
}
//# sourceMappingURL=estado.validator.js.map