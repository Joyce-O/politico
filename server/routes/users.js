import express from 'express';
import UserValidation from '../middlewares.js/UserValidation.js';
import UserController from '../controllers/UserController';


const users = express.Router();

users.post('/signup', UserValidation.handleSignup, UserController.registerUser);
users.post('/login', UserValidation.handleLogin, UserController.LoginUser);


export default users;
