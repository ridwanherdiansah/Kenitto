import { Response, Request, NextFunction } from "express";
import { check, validationResult } from "express-validator";

class authValidation {

    static registrasi = [
        check('name').isString(),
        check('username').isString(),
        check('email').isString(),
        check('password').isLength({ min: 6}),
        (req: Request, res:Response, next:NextFunction) => {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.status(422).json({
                    message: 'Lengkapi data',
    
                });
            }
    
            next();
        }
    ];

    static login = [
        check('email').isString(),
        check('password').isLength({ min: 6}),
        (req: Request, res:Response, next:NextFunction) => {
            const error = validationResult(req);

            if (!error.isEmpty()) {
                return res.status(422).json({
                    message: 'Lengkapi data',
    
                });
            }
    
            next();
        }
    ];
}

export default authValidation;