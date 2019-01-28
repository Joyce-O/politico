import multer from 'multer';
import express from 'express';
import { signupHelper, loginHelper } from '../middlewares/userValidation';
import userController from '../controllers/userController';


const upload = multer({ storage: multer.memoryStorage() });

const authRoutes = express.Router();

authRoutes.post('/signup', upload.single('passportUrl'), signupHelper, userController.handleSignup);
authRoutes.post('/login', loginHelper, userController.handleLogin);


export default authRoutes;
