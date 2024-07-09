import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class PasswordHash {
    static hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    static compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    static jwt = (name:string, username:string, email:string) => {
        const secretKey: string = process.env.JWT_KEY || "knitto"

        
        const token = jwt.sign({ nama: name, username: username, email:email }, secretKey, { expiresIn: '1h' });
        return token;
    }
}

export default PasswordHash;