import { body } from 'express-validator';
import dbPool from '../config/database';
import { RowDataPacket, } from 'mysql2/promise';

interface Users extends RowDataPacket {
    name: string;
    username: string;
    email: string;
    password: string;
}

const create = async (body: Users) => {
    const { name, username, email, password } = body;

    const SQLQuery = `INSERT INTO users (name, username, email, password)
                      VALUES ('${body.name}', '${body.username}', '${body.email}', '${body.password}')`;
    
    return dbPool.execute(SQLQuery, [name, username, email, password]);
}

const getEmail = async (body: Users) => {
    const { email } = body;
    const SQLQuery = `SELECT * FROM users WHERE email = ?`;

    const [rows] = await dbPool.execute<Users[]>(SQLQuery, [email]);
    return rows;
}

export default {
    create,
    getEmail
}
