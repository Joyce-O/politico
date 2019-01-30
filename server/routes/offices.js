import express from 'express';
import OfficeValidation from '../middlewares/OfficeValidation';
import OfficeController from '../controllers/OfficeController';

const offices = express.Router();

offices.post('/', OfficeValidation.handleNewOffice, OfficeController.createOffice);
offices.get('/', OfficeController.getAllOffices);
offices.get('/:officeId', OfficeController.getAnOffice);


export default offices;
