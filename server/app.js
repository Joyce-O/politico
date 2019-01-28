import express from 'express';
import { userRoute, mainRoute } from './routes';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', userRoute);
app.use('/api/v1', mainRoute);
app.get('/api/v1', (request, response) => {
  response.status(200)
    .json({
      success: true,
      message: 'Welcome to Politico, vote on the go!'
    });
});
app.all('*', (request, response) => {
  response.status(404)
    .json({
      success: false,
      message: 'Oops! This page does not exist.'
    });
});

const port = process.env.PORT || 5700;

app.listen(port, () => console.log(`Politico is live on port ${port}`));

export default app;
