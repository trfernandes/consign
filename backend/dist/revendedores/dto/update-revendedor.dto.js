"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRevendedorDto = void 0;
const partial_type_helper_1 = require("@nestjs/mapped-types/dist/partial-type.helper");
const create_revendedor_dto_1 = require("./create-revendedor.dto");
class UpdateRevendedorDto extends (0, partial_type_helper_1.PartialType)(create_revendedor_dto_1.CreateRevendedorDto) {
}
exports.UpdateRevendedorDto = UpdateRevendedorDto;
//# sourceMappingURL=update-revendedor.dto.js.map