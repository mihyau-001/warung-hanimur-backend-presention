"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePresensiDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_presensi_dto_1 = require("./create-presensi.dto");
class UpdatePresensiDto extends (0, mapped_types_1.PartialType)(create_presensi_dto_1.CreatePresensiDto) {
}
exports.UpdatePresensiDto = UpdatePresensiDto;
//# sourceMappingURL=update-presensi.dto.js.map