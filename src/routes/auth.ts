import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import AuthControllers from "../controllers/authControllers";
import validateAuth from "../validation/authValidation";
import { upload } from '../validation/multer';

const router = Router();

router.post('/login', upload.none(), AuthControllers.login);
router.post('/registrasi',upload.none(), validateAuth.registrasi, AuthControllers.registrasi);

export default router;