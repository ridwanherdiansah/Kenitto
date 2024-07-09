import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';

// cek direktori
const cekDirektoriUpload = () => {
  const patchUpload = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(patchUpload)) {
    fs.mkdirSync(patchUpload, { recursive:true });
  }
};

cekDirektoriUpload();

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type, only images are allowed!') as any;
    cb(error, false);
  }
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } });
