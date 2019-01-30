import express from 'express';
import UserValidation from '../middlewares.js/UserValidation';
import UserController from '../controllers/userController';


const users = express.Router();

users.post('/auth/signup', UserValidation.handleSignup, UserController.registerUser);
users.post('/login', UserValidation.handleLogin, UserController.LoginUser);


export default users;
