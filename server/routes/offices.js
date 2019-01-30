import express from 'express';
import officeValidation from '../middlewares/officeValidation';
import officeController from '../controllers/officeController';

const offices = express.Router();

offices.post('/', officeValidation.handleNewOffice, officeController.createOffice);
offices.get('/', officeController.getAllOffices);
offices.get('/:officeId', officeController.getAnOffice);


export default offices;
