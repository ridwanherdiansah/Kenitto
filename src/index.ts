import express from 'express';
import 'dotenv/config';
import path from 'path';
import productsRoutes from './routes/products';
import authRoutes from './routes/auth';
import fakeStoreAPIRoutes from './routes/fakeStoreAPI';
import transaksiRoutes from './routes/transaksi';
import middlewareLogRequest from './middleware/logs';
import jwtToken from './middleware/auth';

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewareLogRequest);

// Routes
app.use('/auth', authRoutes);
app.use('/product', jwtToken.auth, productsRoutes);
app.use('/fakeAPI', jwtToken.auth, fakeStoreAPIRoutes);
app.use('/transaksi', jwtToken.auth, transaksiRoutes);

// Static files (for accessing uploaded files)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Error handling for multer
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Ukuran file tidak boleh melebihi 3MB!' });
  }
  if (err.message === 'Invalid file type, only images are allowed!') {
    return res.status(400).json({ message: 'Jenis file tidak valid, hanya gambar yang diizinkan!' });
  }
  res.status(500).json({ message: 'Terjadi kesalahan pada server!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} berjalan di port ${PORT}`);
});
