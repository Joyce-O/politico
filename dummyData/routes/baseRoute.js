import express from 'express';

const baseRoute = express.Router();

baseRoute.get('/', (request, response) => {
  response.status(200)
    .json({
      success: true,
      message: 'Welcome to Politico, vote on the go!'
    });
});

baseRoute.all('*', (request, response) => {
  response.status(404)
    .json({
      success: false,
      message: 'Oops! This page does not exist.'
    });
});

export default baseRoute;
