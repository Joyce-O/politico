import express from 'express';
import { verifyToken, adminPass } from '../middlewares.js/authorization';
import OtherValidation from '../middlewares.js/OtherValidation';
import OtherController from '../controllers/otherController';


const otherRoute = express.Router();

otherRoute.post('/office/:user-id/register', verifyToken, adminPass, OtherValidation.handleCreateCandidate, OtherController.createCandidate);
otherRoute.post('/votes/', verifyToken, adminPass, OtherValidation.handleVote);
