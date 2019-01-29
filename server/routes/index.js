import express from 'express';
import userRoute from './userRoute';
import parties from './parties';
import offices from './offices';

const router = express.Router();

router.use('/', userRoute);
router.use('/parties', parties);
router.use('/offices', offices);




router.get('/api/v1', (request, response) => {
  response.status(200)
    .json({
      success: true,
      message: 'Welcome to Politico, vote on the go!'
    });
});

export default router;
