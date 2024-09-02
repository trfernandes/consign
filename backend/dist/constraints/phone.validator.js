"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPhoneConstraint = void 0;
exports.IsPhone = IsPhone;
const class_validator_1 = require("class-validator");
let IsPhoneConstraint = class IsPhoneConstraint {
    constructor() {
        this.isValidPhone = (phone) => {
            const sanitizedPhone = phone.replace(/\D/g, '');
            return sanitizedPhone.length == 10;
        };
    }
    validate(value, validationArguments) {
        return this.isValidPhone(value);
    }
    defaultMessage(validationArguments) {
        return 'Telefone inválido';
    }
};
exports.IsPhoneConstraint = IsPhoneConstraint;
exports.IsPhoneConstraint = IsPhoneConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'cpfvalidator', async: false })
], IsPhoneConstraint);
function IsPhone(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneConstraint,
        });
    };
}
//# sourceMappingURL=phone.validator.js.map