import multer from 'multer';
import express from 'express';
import { signupHelper, loginHelper } from '../middleware/userValidation';
import { userHandler, loginHandler } from '../controllers/userController';


const upload = multer({ storage: multer.memoryStorage() });

const authRoutes = express.Router();

authRoutes.post('/api/v1/signup', upload.single('passportUrl'), signupHelper, userHandler);
authRoutes.post('/api/v1/login', loginHelper, loginHandler);


export default authRoutes;
