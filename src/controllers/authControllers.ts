import { Request, Response } from "express";
import AuthModels from "../models/auth";
import PasswordHash from "../utils/passwordHash";

class AuthControllers {
    static registrasi = async (req:Request, res:Response) => {
        try {
            const body = req.body;
            
            const hashedPassword: string = await PasswordHash.hash(body.password);
            const [data] = await AuthModels.create({
                ...body,
                password: hashedPassword
            });

            res.json({
                message: 'Registrasi Success',
                data: data
            })
        } catch (error:any) { 
            res.status(500).json({
                message: 'Registrasi Error',
                serverMessage: error.message 
            });
        }
    }

    static login = async (req:Request, res:Response) => {
        try {
            const body = req.body;

            // cari data user by email
            const data = await AuthModels.getEmail(body);
            if (!data) {
                res.status(401).json({
                    mesage: 'email belum terdaftar'
                })
            }            
            
            const result = data[0];
            
            // check password
            const isPasswordValid = await PasswordHash.compare(body.password, result.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Password salah" });
            }

            // generate token
            const jwt = await PasswordHash.jwt(result.name, result.username, result.email,  );
            
            res.status(200).json({
                message: "Login berhasil",
                token:jwt
            });

        } catch (error:any) { 
            res.status(500).json({
                message: 'Login Error',
                serverMessage: error.message 
            });
        }
    }
}

export default AuthControllers;