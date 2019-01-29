import multer from 'multer';
import express from 'express';
import userValidation from '../middlewares/userValidation';
import userController from '../controllers/userController';


const upload = multer({ storage: multer.memoryStorage() });

const users = express.Router();

users.post('/signup', upload.single('passportUrl'), userValidation.signupHelper, userController.handleSignup);
users.post('/login', userValidation.loginHelper, userController.handleLogin);
 

export default users;
