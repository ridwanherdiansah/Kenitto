import express, { NextFunction } from 'express';
import { Request, Response, Router } from "express";
import transactionControllers from '../controllers/transactionControllers';
import { validationTransakti } from '../validation/transaksiValidation';
import { upload } from '../validation/multer';

const router = Router();

router.post('/', transactionControllers.transaksi);

export default router;