import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

export class PasswordUtils {
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
        return bcrypt.hash(password, saltRounds);
    }

    static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}