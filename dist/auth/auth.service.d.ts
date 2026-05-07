import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            nama: any;
            email: any;
            role: any;
        };
    }>;
}
