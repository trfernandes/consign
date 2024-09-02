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
exports.Revendedor = void 0;
const typeorm_1 = require("typeorm");
const endereco_1 = require("./endereco");
const fiador_1 = require("./fiador");
let Revendedor = class Revendedor {
};
exports.Revendedor = Revendedor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Revendedor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, nullable: false }),
    __metadata("design:type", String)
], Revendedor.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], Revendedor.prototype, "datanascimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 11, nullable: false }),
    __metadata("design:type", String)
], Revendedor.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15, nullable: false }),
    __metadata("design:type", String)
], Revendedor.prototype, "celular1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15, nullable: true }),
    __metadata("design:type", String)
], Revendedor.prototype, "celular2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 11, nullable: true }),
    __metadata("design:type", String)
], Revendedor.prototype, "telefoneresidencial", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, nullable: true }),
    __metadata("design:type", String)
], Revendedor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(() => endereco_1.Endereco, { prefix: 'endereco_' }),
    __metadata("design:type", endereco_1.Endereco)
], Revendedor.prototype, "endereco", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Revendedor.prototype, "casaalugada", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Date)
], Revendedor.prototype, "dataaluguel", void 0);
__decorate([
    (0, typeorm_1.Column)(() => fiador_1.Fiador, { prefix: 'fiador_' }),
    __metadata("design:type", fiador_1.Fiador)
], Revendedor.prototype, "fiador", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Revendedor.prototype, "observacoes", void 0);
exports.Revendedor = Revendedor = __decorate([
    (0, typeorm_1.Entity)()
], Revendedor);
//# sourceMappingURL=revendedor.entity.js.map