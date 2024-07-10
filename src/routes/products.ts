import express from 'express';
import productsControllers from '../controllers/productsControllers';
import { upload } from '../validation/multer';
import { Request, Response, NextFunction } from 'express';
import { validateProduct } from '../validation/productValidation';

const router = express.Router();

// Middleware
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Routes lainnya
router.get('/', productsControllers.getAllProduct);

router.post('/', upload.single('file'), validateProduct, (req: Request, res: Response, next: NextFunction) => {
  // cek file
  if (!req.file) {
    return res.status(400).json({ message: 'File harus berupa gambar' });
  }
  // Lanjutkan ke controller jika file sudah diunggah
  next();
}, productsControllers.createProduct);

router.patch('/:id', upload.single('file'), (req, res, next) => {
  // cek file
  if (!req.file) {
    return res.status(400).json({ message: 'File harus berupa gambar' });
  }
  next();
}, productsControllers.updateProduct);
router.delete('/:id', productsControllers.deleteProduct);

router.get('/joinProduct', productsControllers.getJoinProduct);

export default router;
