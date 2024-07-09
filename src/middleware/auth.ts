import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

class Auth {
    static auth = (req: Request, res: Response, next: NextFunction) => {
        // Periksa apakah ada token di header authorization
        if (!req.headers.authorization) {
            return res.status(400).json({
                message: 'token tidak ada'
            });
        }

        const secretKey: string = process.env.JWT_KEY || "knitto";
        const token: string = req.headers.authorization.split(" ")[1];

        try {
            const credential: string | object = jwt.verify(token, secretKey);

            // token valid
            if (credential) {
                next();
            }
        } catch (error: any) {
            res.status(500).json({
                serverMessage: error.message
            });
        }
    }
}

export default Auth;
