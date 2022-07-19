import { Router } from 'express';

import assetController from '../controllers/asset.controller';

const routers = Router();

routers.get('/client/:id', assetController.getAssetByClientId);

export default routers;