"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const authRoutes_1 = require("./routes/authRoutes");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Absen Hanimur API')
        .setDescription('Sistem Absensi Warung Hanimur')
        .setVersion('1.0')
        .build();
    app.enableCors();
    app.use('/api/auth', authRoutes_1.default);
    await app.listen(3003);
}
bootstrap();
//# sourceMappingURL=main.js.map