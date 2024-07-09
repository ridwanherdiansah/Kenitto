import { Request, Response, NextFunction } from 'express';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log('Terjadi request ke PATH', req.path);
    next();
};

export default logRequest;
