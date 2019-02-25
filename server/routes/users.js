import express from 'express';
import multer from 'multer';
// import storage from '../config/cloudinaryConfig';
import UserValidation from '../middlewares.js/UserValidation';
import UserController from '../controllers/userController';


const users = express.Router();

const multerUploads = multer({ storage: multer.memoryStorage() }).single('passportUrl');

users.post('/auth/signup', multerUploads, UserValidation.handleSignup, UserController.registerUser);
users.post('/auth/login', UserValidation.handleLogin, UserController.loginUser);


export default users;
