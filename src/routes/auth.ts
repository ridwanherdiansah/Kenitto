import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import AuthControllers from "../controllers/authControllers";
import validateAuth from "../validation/authValidation";

const router = Router();

router.post('/login', AuthControllers.login);
router.post('/registrasi',validateAuth.registrasi, AuthControllers.registrasi);

export default router;