import multer from 'multer';
import express from 'express';
import signupHelper from '../middleware/userValidation';
import userHandler from '../controllers/userController';


const upload = multer({ storage: multer.memoryStorage() });

const authRoutes = express.Router();

authRoutes.post('/api/v1/signup', upload.single('passportUrl'), signupHelper, userHandler);


export default authRoutes;
