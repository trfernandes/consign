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
exports.RevendedoresService = void 0;
const common_1 = require("@nestjs/common");
const revendedor_interface_repository_1 = require("./repositories/contracts/revendedor.interface.repository.");
let RevendedoresService = class RevendedoresService {
    constructor(revendedorRepository) {
        this.revendedorRepository = revendedorRepository;
    }
    async findAll() {
        return await this.revendedorRepository.findAll();
    }
    async findOne(id) {
        return await this.revendedorRepository.findOne(id);
    }
    async create(revendedor) {
        return await this.revendedorRepository.create(revendedor);
    }
    async update(id, revendedor) {
        return await this.revendedorRepository.update(id, revendedor);
    }
    async delete(id) {
        await this.revendedorRepository.delete(id);
    }
};
exports.RevendedoresService = RevendedoresService;
exports.RevendedoresService = RevendedoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(revendedor_interface_repository_1.RevendedorInterfaceRepository)),
    __metadata("design:paramtypes", [revendedor_interface_repository_1.RevendedorInterfaceRepository])
], RevendedoresService);
//# sourceMappingURL=revendedores.service.js.map