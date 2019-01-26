import express from 'express';
import baseRoute from './server/dummyData/routes/baseRoute';
import authRoutes from './server/dummyData/routes/authRoute';
import router from './server/dummyData/routes/mainRoute';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/', authRoutes);
app.use('/', baseRoute);

const port = process.env.PORT || 5700;

app.listen(port, () => console.log(`Politico is live on port ${port}`));

export default app;
