import { Request, Response } from "express";
import axios from "axios";

class fakeStoreAPI {

    static getAllFakeStore = async (req:Request, res:Response) => {
        try {
            const result = await axios.get('https://fakestoreapi.com/products');
            const products = result.data;
            res.status(200).json({
                data: products
            });   
        } catch (error:any) {
            res.status(500).json({
                message: 'Data gagal di ambil',
                serverMessage: error.message 
            });
        }
    };

    static createFakeStore = async (req:Request, res:Response) => {
        try {
            const body = req.body;

            const response = await axios.post('https://fakestoreapi.com/products', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response) {
                res.status(500).json({ 
                    message: 'Create product API gagal'
                });
            };

            res.status(200).json({
                message: 'Create product API success',
                data: response.data
            })

        } catch (error:any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }
    };

    static updateFakeStore = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const id = parseInt(req.params.id);

            const response = await axios.patch(`https://fakestoreapi.com/products/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            res.json({
                message: 'Update product success',
                data: response.data
            });

        } catch (error: any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }
    };

    static deleteFakeStore = async (req: Request, res:Response) => {
        const id = parseInt(req.params.id);

        try {
            const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
            res.status(200).json({
                data: response
            });
        } catch (error:any) {
            res.status(500).json({ 
                message: 'Server Error',
                serverMessage: error.message 
            });
        }

    }
}

export default fakeStoreAPI;