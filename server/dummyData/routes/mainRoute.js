import express from 'express';
import multer from 'multer';
import { newPartyHelper, getPartyHelper, editPartyHelper } from '../middleware/mainValidator';
import {
  newPartyHandler, allParties, aPartyHandler, editParty
} from '../controllers/mainController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/api/v1/parties', upload.single('logoUrl'), newPartyHelper, newPartyHandler);
router.get('/api/v1/parties', allParties);
router.get('/api/v1/parties/:partyId', getPartyHelper, aPartyHandler);
router.patch('/api/v1/parties/:partyId/name', editPartyHelper, editParty);

export default router;
