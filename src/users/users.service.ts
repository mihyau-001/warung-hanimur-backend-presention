import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Email atau Password salah!');
    }

    return {
      id: user.id,
      nama: user.nama,
      email: user.email,
    };
  }
}