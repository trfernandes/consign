"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCpfConstraint = void 0;
exports.IsCpf = IsCpf;
const class_validator_1 = require("class-validator");
let IsCpfConstraint = class IsCpfConstraint {
    validate(value, validationArguments) {
        return this.isCpfValid(value);
    }
    defaultMessage(validationArguments) {
        return 'Cpf inválido';
    }
    isCpfValid(cpf) {
        let Soma = 0;
        let Resto;
        const strCPF = String(cpf).replace(/[^\d]/g, '');
        if (strCPF.length !== 11)
            return false;
        if ([
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999',
        ].indexOf(strCPF) !== -1)
            return false;
        for (let i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if (Resto == 10 || Resto == 11)
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)))
            return false;
        Soma = 0;
        for (let i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if (Resto == 10 || Resto == 11)
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11)))
            return false;
        return true;
    }
};
exports.IsCpfConstraint = IsCpfConstraint;
exports.IsCpfConstraint = IsCpfConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'cpfvalidator', async: false })
], IsCpfConstraint);
function IsCpf(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfConstraint,
        });
    };
}
//# sourceMappingURL=cpf.validator.js.map