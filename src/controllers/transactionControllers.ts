import { Request, Response } from "express";
import AuthModels from '../models/auth';
import ProductModels from "../models/product";
import PasswordHash from "../utils/passwordHash";
import { OkPacket } from 'mysql2/promise';

class transactionControllers {
    static transaksi = async (req:Request, res:Response) => {
        try {
            const body = req.body;
           // buat user baru
           const hashedPassword: string = await PasswordHash.hash(body.password);
           const [users] = await AuthModels.create({
            ...body,
            password:hashedPassword
           }) as OkPacket[];

            // Ambil id_users dari hasil insert
            const insertId = users.insertId;

            const [product] =await ProductModels.create({
                ...body,
                name: body.nameProduct,
                id_users: insertId
            });

           res.status(200).json({
            users:users,
            product:product

           });

        } catch (error:any) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: error.message
            });
        }
    };
};

export default transactionControllers;