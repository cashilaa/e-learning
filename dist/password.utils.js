"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUtils = void 0;
const bcrypt = require("bcrypt");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class PasswordUtils {
    static async hashPassword(password) {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
        return bcrypt.hash(password, saltRounds);
    }
    static async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
exports.PasswordUtils = PasswordUtils;
//# sourceMappingURL=password.utils.js.map