import { Request, Response } from 'express';
import ProductModels from '../models/product';

class ProductsControllers {
    static getAllProduct = async (req: Request, res: Response) => {
        try {
            const [data] = await ProductModels.get();

            res.json({
                message: 'Get All Product',
                data: data
            });
        } catch (error:any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }
    }

    static createProduct = async (req:Request, res:Response) => {
        try {
            const body = req.body;

            // konfigurasi multer untuk menyimpan file
            if (req.file) {
                body.imageUrl = `/uploads/${req.file.filename}`;
            }
            
            const [data] = await ProductModels.create(body);

            res.json({
                message: 'Create Success',
                data:data,
            });
        } catch (error:any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }
    }

    static updateProduct = async (req:Request, res:Response) => {
        try {
            const body = req.body;
            const id = parseInt(req.params.id);
            const [data] = await ProductModels.update(body, {id});

            res.json({
                message: 'Updated Success',
                data: data
            })
        } catch (error:any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }
    }

    static deleteProduct = async (req:Request, res:Response) => {
        try {
            const id = parseInt(req.params.id);
            const [data] = await ProductModels.destroy({id});

            res.json({
                message: 'Delete Success',
            })
        } catch (error:any) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: error.message
            });
        }
    }

    static getJoinProduct = async (req:Request, res:Response) => {
        try {
            const [data] = await ProductModels.getJoinProduct();

            res.status(200).json({
                message: 'join berhasil',
                data: data
            })
        } catch (error:any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }
    }
}

export default ProductsControllers;
