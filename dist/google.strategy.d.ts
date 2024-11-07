import { VerifyCallback } from 'passport-google-oauth20';
import { JwtService } from '@nestjs/jwt';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private jwtService;
    constructor(jwtService: JwtService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
declare const GoogleStudentStrategy_base: new (...args: any[]) => any;
export declare class GoogleStudentStrategy extends GoogleStudentStrategy_base {
    private jwtService;
    constructor(jwtService: JwtService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
