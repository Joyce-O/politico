import express from 'express';
import multer from 'multer';
import mainValidation from '../middlewares/mainValidation';
import mainController from '../controllers/mainController';

const parties = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

parties.post('/', upload.single('logoUrl'), mainValidation.newPartyHelper, mainController.handleCreateParty);
parties.get('/', mainController.allParties);
parties.get('/:partyId', mainValidation.getPartyHelper, mainController.handleGetAParty);
parties.patch('/:partyId/name', mainValidation.editPartyHelper, mainController.editParty);
parties.delete('/:partyId', mainValidation.getPartyHelper, mainController.deleteParty);

export default parties;
