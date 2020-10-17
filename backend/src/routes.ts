import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OrphanagesController from './controllers/OrphanagesController';

import uploadConfig from './config/upload';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.use(cors());
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;
