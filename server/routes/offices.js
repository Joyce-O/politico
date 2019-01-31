import express from 'express';
import OfficeValidation from '../middlewares.js/OfficeValidation';
import OfficeController from '../controllers/OfficeController';
import { verifyToken } from '../middlewares.js/authorization';

const offices = express.Router();

offices.post('/', verifyToken, OfficeValidation.handleNewOffice, OfficeController.createOffice);
offices.get('/', verifyToken, OfficeController.getAllOffices);
offices.get('/:officeId', verifyToken, OfficeController.getAnOffice);


export default offices;
