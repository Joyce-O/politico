import express from 'express';
import multer from 'multer';
import UserValidation from '../middlewares.js/UserValidation';
import UserController from '../controllers/userController';


const users = express.Router();

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('passportUrl');

users.post('/auth/signup', multerUploads, UserValidation.handleSignup, UserController.registerUser);
users.post('/auth/login', UserValidation.handleLogin, UserController.loginUser);


export default users;
