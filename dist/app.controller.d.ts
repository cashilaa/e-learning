import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): "No user from google" | {
        message: string;
        user: any;
        token: string;
    };
    googleStudentAuth(req: any): Promise<void>;
    googleStudentAuthRedirect(req: any): "No user from google" | {
        message: string;
        user: any;
        token: string;
    };
}
