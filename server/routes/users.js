import express from 'express';
import userValidation from '../middlewares/userValidation';
import userController from '../controllers/userController';


const users = express.Router();

users.post('/signup', userValidation.handleSignup, userController.registerUser);
users.post('/login', userValidation.handleLogin, userController.LoginUser);


export default users;
