import { Router } from 'express';

import assetController from '../controllers/asset.controller';

const routers = Router();

routers.get('/client/:id', assetController.getAssetByClientId);
routers.get('/asset/:id', assetController.getAssetById);
routers.get('/all', assetController.listAllAssets);

export default routers;
