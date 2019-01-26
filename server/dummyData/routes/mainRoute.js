import express from 'express';
import multer from 'multer';
import newPartyHelper from '../middleware/mainValidator';
import newPartyHandler from '../controllers/mainController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/api/v1/parties', upload.single('logoUrl'), newPartyHelper, newPartyHandler);

export default router;
