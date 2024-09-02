"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiadorDto = void 0;
const class_validator_1 = require("class-validator");
const endereco_dto_1 = require("./endereco.dto");
const cpf_validator_1 = require("../../constraints/cpf.validator");
const class_transformer_1 = require("class-transformer");
class FiadorDto {
}
exports.FiadorDto = FiadorDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome é obrigatório' }),
    (0, class_validator_1.MaxLength)(80, { message: 'O nome deve ter no máximo 80 caracteres' }),
    __metadata("design:type", String)
], FiadorDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O cpf é obrigatório' }),
    (0, class_validator_1.MinLength)(11, { message: 'A quantidade de caracteres do cpf deve ser é 11' }),
    (0, class_validator_1.MaxLength)(11, { message: 'A quantidade de caracteres do cpf deve ser é 11' }),
    (0, cpf_validator_1.IsCpf)(),
    __metadata("design:type", String)
], FiadorDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O endereço é obrigatório' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => endereco_dto_1.EnderecoDto),
    __metadata("design:type", endereco_dto_1.EnderecoDto)
], FiadorDto.prototype, "endereco", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail é inválido' }),
    (0, class_validator_1.MaxLength)(80, { message: 'O e-mail deve ter no máximo 80 caracteres' }),
    __metadata("design:type", String)
], FiadorDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O celular 1 é obrigatório' }),
    (0, class_validator_1.IsMobilePhone)(),
    __metadata("design:type", String)
], FiadorDto.prototype, "celular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FiadorDto.prototype, "observacoes", void 0);
//# sourceMappingURL=fiador.dto.js.map