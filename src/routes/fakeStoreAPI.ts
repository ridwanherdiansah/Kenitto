import express from 'express';
import { Router, Request, Response } from 'express';
import fakeStoreAPIController from '../controllers/fakeStore';
const router = Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', fakeStoreAPIController.getAllFakeStore);
router.post('/', fakeStoreAPIController.createFakeStore);
router.patch('/:id', fakeStoreAPIController.updateFakeStore);
router.delete('/:id', fakeStoreAPIController.deleteFakeStore);


export default router;