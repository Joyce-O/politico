import express from 'express';
import PartyValidation from '../middlewares.js/PartyValidation';
import PartyController from '../controllers/PartyController';
import { verifyToken, adminPass } from '../middlewares.js/authorization';

const parties = express.Router();

parties.post('/', verifyToken, adminPass, PartyValidation.handleCreateParty, PartyController.createParty);
parties.get('/', verifyToken, PartyController.getAllParties);
parties.get('/:partyId', verifyToken, PartyController.getOneParty);
parties.patch('/:partyId/name', verifyToken, PartyValidation.handleEditParty, PartyController.editParty);
parties.delete('/:partyId', verifyToken, adminPass, PartyController.deleteParty);

export default parties;
