"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const password_utils_1 = require("./password.utils");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let AppService = class AppService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.mockUsers = [
            {
                email: 'student@example.com',
                passwordHash: '$2b$10$YourHashedPasswordHere',
                role: 'student'
            },
        ];
    }
    async login(loginData, userType) {
        try {
            const { email, password } = loginData;
            if (!email || !password) {
                throw new common_1.UnauthorizedException('Email and password are required');
            }
            const user = this.mockUsers.find(u => u.email === email);
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const isPasswordValid = await password_utils_1.PasswordUtils.comparePassword(password, user.passwordHash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (user.role !== userType) {
                throw new common_1.UnauthorizedException('Invalid user type');
            }
            const token = this.jwtService.sign({
                email: user.email,
                role: user.role,
                sub: email
            }, {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRATION
            });
            return {
                token,
                user: {
                    email: user.email,
                    role: user.role
                }
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message || 'Invalid credentials');
        }
    }
    googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        const token = this.jwtService.sign({
            email: req.user.email,
            role: req.user.role,
            sub: req.user.email
        }, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRATION
        });
        return {
            message: 'User Info from Google',
            user: req.user,
            token
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AppService);
//# sourceMappingURL=app.service.js.map