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
exports.EnderecoDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const estado_validator_1 = require("../../constraints/estado.validator");
class EnderecoDto {
}
exports.EnderecoDto = EnderecoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O logradouro é obrigatório' }),
    (0, class_validator_1.MaxLength)(80, { message: 'O logradouro deve ter no máximo 80 caracteres' }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "logradouro", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O número é obrigatório' }),
    (0, class_validator_1.MaxLength)(5, { message: 'O número deve ter no máximo 5 caracteres' }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "numero", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O bairro é obrigatório' }),
    (0, class_validator_1.MaxLength)(80, { message: 'O bairro deve ter no máximo 80 caracteres' }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "bairro", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(80, { message: 'O complemento deve ter no máximo 80 caracteres' }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "complemento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(7, { message: 'O CEP deve ter no máximo 7 caracteres' }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "cep", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O estado é obrigatório' }),
    (0, class_validator_1.MinLength)(2, { message: 'O estado deve ter no mínimo 2 caracteres' }),
    (0, class_validator_1.MaxLength)(2, { message: 'O estado deve ter no máximo 2 caracteres' }),
    (0, estado_validator_1.IsEstado)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    __metadata("design:type", String)
], EnderecoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'A cidade é obrigatória' }),
    (0, class_validator_1.MaxLength)(80, { message: 'A cidade deve ter no máximo 80 caracteres' }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200, {
        message: 'As observações devem ter no máximo 200 caracteres',
    }),
    __metadata("design:type", String)
], EnderecoDto.prototype, "observacoes", void 0);
//# sourceMappingURL=endereco.dto.js.map