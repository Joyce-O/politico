import express from 'express';
import multer from 'multer';
import mainValidation from '../middlewares/mainValidation';
import mainController from '../controllers/mainController';

const mainRoute = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

mainRoute.post('/parties', upload.single('logoUrl'), mainValidation.newPartyHelper, mainController.handleCreateParty);
mainRoute.get('/parties', mainController.allParties);
mainRoute.get('/parties/:partyId', mainValidation.getPartyHelper, mainController.handleGetAParty);
mainRoute.patch('/parties/:partyId/name', mainValidation.editPartyHelper, mainController.editParty);
mainRoute.delete('/parties/:partyId', mainValidation.getPartyHelper, mainController.deleteParty);
mainRoute.post('/offices', mainValidation.newOfficeHelper, mainController.handleCreateOffice);
mainRoute.get('/offices', mainController.allOffices);
mainRoute.get('/offices/:officeId', mainValidation.getOfficeHelper, mainController.handleGetAnOffice);

export default mainRoute;
