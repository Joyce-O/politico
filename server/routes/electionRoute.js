import express from 'express';
import { verifyToken, adminPass } from '../middlewares.js/authorization';
import electionValidation from '../middlewares.js/electionValidation';
import electionController from '../controllers/electionController';


const electionRoute = express.Router();

electionRoute.post('/office/:userId/register', verifyToken, adminPass, electionValidation.handleCreateCandidate, electionController.createCandidate);
electionRoute.post('/votes/', verifyToken, electionValidation.handleVote, electionController.castVote);
electionRoute.get('/office/:officeId/result', verifyToken, electionController.result);

export default electionRoute;
