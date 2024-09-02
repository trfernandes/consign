"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevendedoresModule = void 0;
const common_1 = require("@nestjs/common");
const revendedores_controller_1 = require("./revendedores.controller");
const revendedores_service_1 = require("./revendedores.service");
const typeorm_1 = require("@nestjs/typeorm");
const revendedor_entity_1 = require("./entities/revendedor.entity");
const revendedor_repository_typeorm_1 = require("./repositories/revendedor.repository.typeorm");
const revendedor_interface_repository_1 = require("./repositories/contracts/revendedor.interface.repository.");
let RevendedoresModule = class RevendedoresModule {
};
exports.RevendedoresModule = RevendedoresModule;
exports.RevendedoresModule = RevendedoresModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([revendedor_entity_1.Revendedor])],
        providers: [
            {
                provide: revendedor_interface_repository_1.RevendedorInterfaceRepository,
                useClass: revendedor_repository_typeorm_1.RevendedorRepositoryTypeOrm,
            },
            revendedores_service_1.RevendedoresService,
        ],
        controllers: [revendedores_controller_1.RevendedoresController],
    })
], RevendedoresModule);
//# sourceMappingURL=revendedores.module.js.map