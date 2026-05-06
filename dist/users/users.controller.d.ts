import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(dto: LoginUserDto): Promise<{
        id: number;
        nama: string;
        email: string;
    }>;
}
