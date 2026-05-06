"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGudangDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_gudang_dto_1 = require("./create-gudang.dto");
class UpdateGudangDto extends (0, mapped_types_1.PartialType)(create_gudang_dto_1.CreateGudangDto) {
    harga;
}
exports.UpdateGudangDto = UpdateGudangDto;
//# sourceMappingURL=update-gudang.dto.js.map