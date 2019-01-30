import express from 'express';
import users from './users';
import parties from './parties';
import offices from './offices';

const router = express.Router();

router.use('/', users);
router.use('/parties', parties);
router.use('/offices', offices);

router.get('/', (request, response) => {
  response.status(200)
    .json({
      status: true,
      data: 'Welcome to Politico, vote on the go!',
    });
});

export default router;
