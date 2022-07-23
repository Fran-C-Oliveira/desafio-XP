import { Router } from 'express';

import buyController from '../controllers/buyAsset.controller';
import sellController from '../controllers/sellAsset.controller';

const routers = Router();

routers.post('/buy', buyController.buyAsset);
routers.post('/sell', sellController.sellAsset);

export default routers;
