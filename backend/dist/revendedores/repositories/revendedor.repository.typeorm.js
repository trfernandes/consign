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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevendedorRepositoryTypeOrm = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const revendedor_entity_1 = require("../entities/revendedor.entity");
const common_1 = require("@nestjs/common");
let RevendedorRepositoryTypeOrm = class RevendedorRepositoryTypeOrm {
    constructor(revendedorRepository) {
        this.revendedorRepository = revendedorRepository;
    }
    async findAll() {
        return await this.revendedorRepository.find();
    }
    async findOne(id) {
        return await this.revendedorRepository.findOne({ where: { id } });
    }
    async create(revendedor) {
        const newuser = await this.revendedorRepository.create(revendedor);
        return this.revendedorRepository.save(newuser);
    }
    async update(id, revendedor) {
        const existingRevendedor = await this.findOne(id);
        const newRevendedor = this.revendedorRepository.merge(existingRevendedor, revendedor);
        return await this.revendedorRepository.save(newRevendedor);
    }
    async delete(id) {
        await this.revendedorRepository.delete(id);
    }
};
exports.RevendedorRepositoryTypeOrm = RevendedorRepositoryTypeOrm;
exports.RevendedorRepositoryTypeOrm = RevendedorRepositoryTypeOrm = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(revendedor_entity_1.Revendedor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RevendedorRepositoryTypeOrm);
//# sourceMappingURL=revendedor.repository.typeorm.js.map