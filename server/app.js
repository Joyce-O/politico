import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { resolve } from  'path';
import routes from './routes';
import { uploader, cloudinaryConfig } from './config/cloudinaryConfig'
import { multerUploads, dataUri } from './middlewares/multerUpload';

const app = express();
const swaggerDoc = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(resolve(__dirname, 'src/public')));
app.use(json());
app.use('*', cloudinaryConfig);
app.get('/*', (req, res) => res.sendFile(resolve(__dirname, '../public/index.html')));
app.post('/upload', multerUploads, (req, res) => {
if(req.file) {
const file = dataUri(req).content;
return uploader.upload(file).then((result) => {
const image = result.url;
return res.status(200).json({
messge: 'Your image has been uploded successfully to cloudinary',
data: {
image
}
})
}).catch((err) => res.status(400).json({
messge: 'someting went wrong while processing your request',
data: {
err
}
}))
}
});

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-token');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', routes);

app.all('*', (request, response) => {
  response.status(404)
    .json({
      status: 404,
      error: 'Oops! This page does not exist.',
    });
});

const port = process.env.PORT || 5700;

app.listen(port, () => `Politico is live on port ${port}`);

export default app;
