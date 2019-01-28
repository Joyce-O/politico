import multer from 'multer';
import express from 'express';
import userValidation from '../middlewares/userValidation';
import userController from '../controllers/userController';


const upload = multer({ storage: multer.memoryStorage() });

const userRoute = express.Router();

userRoute.post('/signup', upload.single('passportUrl'), userValidation.signupHelper, userController.handleSignup);
userRoute.post('/login', userValidation.loginHelper, userController.handleLogin);


export default userRoute;
