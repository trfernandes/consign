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
exports.RevendedoresController = void 0;
const common_1 = require("@nestjs/common");
const revendedor_entity_1 = require("./entities/revendedor.entity");
const revendedores_service_1 = require("./revendedores.service");
const create_revendedor_dto_1 = require("./dto/create-revendedor.dto");
const class_transformer_1 = require("class-transformer");
const update_revendedor_dto_1 = require("./dto/update-revendedor.dto");
let RevendedoresController = class RevendedoresController {
    constructor(revendedoresService) {
        this.revendedoresService = revendedoresService;
    }
    async findAll() {
        try {
            return await this.revendedoresService.findAll();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar revendedores', error.message);
        }
    }
    async findOne(id) {
        try {
            const data = await this.revendedoresService.findOne(id);
            if (!data) {
                throw new common_1.NotFoundException(`O Revendedor '${id}' não existe`);
            }
            else {
                return data;
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao buscar revendedor', error.message);
        }
    }
    async create(body) {
        try {
            const data = (0, class_transformer_1.plainToInstance)(revendedor_entity_1.Revendedor, body, {});
            return this.revendedoresService.create(data);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao inserir revendedor', error.message);
        }
    }
    async update(id, body) {
        try {
            const data = await this.revendedoresService.update(id, body);
            return { message: 'Revendedor atualizado com sucesso', data: data };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar revendedor', error.message);
        }
    }
    async delete(id) {
        try {
            const data = await this.revendedoresService.findOne(id);
            if (!data) {
                throw new common_1.NotFoundException('O Revendedor não existe');
            }
            await this.revendedoresService.delete(id);
            return { message: 'Revendedor removido com sucesso' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar revendedor', error.message);
        }
    }
};
exports.RevendedoresController = RevendedoresController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RevendedoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RevendedoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_revendedor_dto_1.CreateRevendedorDto]),
    __metadata("design:returntype", Promise)
], RevendedoresController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_revendedor_dto_1.UpdateRevendedorDto]),
    __metadata("design:returntype", Promise)
], RevendedoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RevendedoresController.prototype, "delete", null);
exports.RevendedoresController = RevendedoresController = __decorate([
    (0, common_1.Controller)('revendedores'),
    __param(0, (0, common_1.Inject)(revendedores_service_1.RevendedoresService)),
    __metadata("design:paramtypes", [revendedores_service_1.RevendedoresService])
], RevendedoresController);
//# sourceMappingURL=revendedores.controller.js.map