import { Request, Response } from "express";
import dbPool from '../config/database';
import AuthModels from '../models/auth';
import ProductModels from "../models/product";
import PasswordHash from "../utils/passwordHash";
import { OkPacket, PoolConnection } from "mysql2/promise";

class transactionControllers {
    static transaksi = async (req: Request, res: Response) => {
        let connection: PoolConnection | undefined;

        try {
            // Mendapatkan koneksi dari pool
            connection = await dbPool.getConnection() as PoolConnection;
            // Memulai transaksi
            await connection.beginTransaction();

            for (const body of req.body) {
                // Hash password
                const hashedPassword = await PasswordHash.hash(body.password);

                // Insert user
                const [result1] = await connection.query(
                    'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
                    [body.name, body.username, body.email, hashedPassword]
                );
                const insertId = (result1 as OkPacket).insertId;

                // Insert product
                await connection.query(
                    'INSERT INTO product (name, size, id_users, imageUrl) VALUES (?, ?, ?, ?)',
                    [body.nameProduct, body.size, insertId, body.imageUrl]
                );
            }

            // Commit transaksi jika semua operasi berhasil
            await connection.commit();
            res.status(200).json({
                message: 'Transaksi berhasil'
            });

        } catch (error: any) {
            // Rollback transaksi jika terjadi kesalahan
            if (connection) await connection.rollback();
            res.status(500).json({
                message: 'Server Error',
                serverMessage: error.message
            });
        } finally {
            // Akhiri koneksi setelah selesai
            if (connection) connection.release();
        }
    };
}

export default transactionControllers;
