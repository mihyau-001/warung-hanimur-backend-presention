import { PrismaService } from '../prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    login(dto: LoginUserDto): Promise<{
        id: number;
        nama: string;
        email: string;
    }>;
}
