import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// FIKS: Jangan impor describe, beforeEach, it dari mana pun. 
// Jest akan menyediakannya secara global.

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // FIKS: Tambahkan baris ekspektasinya agar tes benar-benar mengecek nilai
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});