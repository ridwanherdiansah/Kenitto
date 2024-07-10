import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validationTransakti = [
    // users
    check('name').notEmpty().withMessage('Name harus di isi').isString().withMessage('Name harus berupa integer'),
    check('username').notEmpty().withMessage('Size harus di isi').isString().withMessage('Size harus berupa integer'),
    check('email').notEmpty().withMessage('Name harus di isi').isString().withMessage('Name harus berupa integer'),
    check('password').notEmpty().withMessage('Password harus di isi').isString().withMessage('Password harus berupa integer'),
    
    // produt
    check('nameProduct').notEmpty().withMessage('Name Product harus di isi').isString().withMessage('Name Product harus berupa integer'),
    check('size').notEmpty().withMessage('Size harus di isi').isString().withMessage('Size harus berupa integer'),
    
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
