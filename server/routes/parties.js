import express from 'express';
import partyValidation from '../middlewares/partyValidation';
import partyController from '../controllers/partyController';

const parties = express.Router();

parties.post('/', partyValidation.handleCreateParty, partyController.createParty);
parties.get('/', partyController.getAllParties);
parties.get('/:partyId', partyController.getOneParty);
parties.patch('/:partyId/name', partyValidation.handleEditParty, partyController.editParty);
parties.delete('/:partyId', partyController.deleteParty);

export default parties;
