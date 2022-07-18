import { Router } from 'express';

import buyController from '../controllers/buyAsset.controller';

const routers = Router();

routers.post('/buy', buyController.buyAsset);

export default routers;
