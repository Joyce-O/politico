import express from 'express';
import mainValidation from '../middlewares/mainValidation';
import mainController from '../controllers/mainController';

const offices = express.Router();

offices.post('/', mainValidation.newOfficeHelper, mainController.handleCreateOffice);
offices.get('/', mainController.allOffices);
offices.get('/:officeId', mainValidation.getOfficeHelper, mainController.handleGetAnOffice);


export default offices;