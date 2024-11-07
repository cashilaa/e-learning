import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private jwtService;
    private readonly mockUsers;
    constructor(jwtService: JwtService);
    login(loginData: any, userType: string): Promise<{
        token: string;
        user: {
            email: string;
            role: string;
        };
    }>;
    googleLogin(req: any): "No user from google" | {
        message: string;
        user: any;
        token: string;
    };
}
