import { body, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';

export const validateProduct = [
    body('name').notEmpty().withMessage('Name harus di isi').isString().withMessage('Name harus berupa integer'),
    body('size').notEmpty().withMessage('Size harus di isi').isString().withMessage('Size harus berupa integer'),
    body('id_users').notEmpty().withMessage('User Id harus di isi').isInt().withMessage('User ID harus berupa integer'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


