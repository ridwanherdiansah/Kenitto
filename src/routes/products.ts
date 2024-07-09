import express from 'express';
import productsControllers from '../controllers/productsControllers';
import { upload } from '../validation/multer'; // Pastikan path ini sesuai dengan lokasi multerConfig.ts Anda

const router = express.Router();

// Middleware
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', productsControllers.getAllProduct);
router.post('/', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File harus berupa gambar' });
  }
  next();
}, productsControllers.createProduct);
router.patch('/:id', upload.single('file'), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File harus berupa gambar' });
  }
  next();
}, productsControllers.updateProduct);
router.delete('/:id', productsControllers.deleteProduct);

router.get('/joinProduct', productsControllers.getJoinProduct);


export default router;
