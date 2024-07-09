import express from 'express';
import { Request, Response, Router } from "express";
import transactionControllers from '../controllers/transactionControllers';

const router = Router();

router.post('/', transactionControllers.transaksi);

export default router;