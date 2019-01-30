import express from 'express';
import PartyValidation from '../middlewares.js/PartyValidation';
import PartyController from '../controllers/PartyController';

const parties = express.Router();

parties.post('/', PartyValidation.handleCreateParty, PartyController.createParty);
parties.get('/', PartyController.getAllParties);
parties.get('/:partyId', PartyController.getOneParty);
parties.patch('/:partyId/name', PartyValidation.handleEditParty, PartyController.editParty);
parties.delete('/:partyId', PartyController.deleteParty);

export default parties;
