import express from 'express';
import PartyValidation from '../middlewares.js/PartyValidation';
import PartyController from '../controllers/PartyController';
import { verifyToken } from '../middlewares.js/authorization';

const parties = express.Router();

parties.post('/', verifyToken, PartyValidation.handleCreateParty, PartyController.createParty);
parties.get('/', verifyToken, PartyController.getAllParties);
parties.get('/:partyId', verifyToken, PartyController.getOneParty);
parties.patch('/:partyId/name', verifyToken, PartyValidation.handleEditParty, PartyController.editParty);
parties.delete('/:partyId', verifyToken, PartyController.deleteParty);

export default parties;
