import express from 'express';
import multer from 'multer';
import { newPartyHelper, getPartyHelper } from '../middleware/mainValidator';
import { newPartyHandler, allParties, aPartyHandler } from '../controllers/mainController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/api/v1/parties', upload.single('logoUrl'), newPartyHelper, newPartyHandler);
router.get('/api/v1/parties', allParties);
router.get('/api/v1/parties/:partyId', getPartyHelper, aPartyHandler);

export default router;
