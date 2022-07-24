import { Router } from 'express';

import stocksController from '../controllers/stocks.controller';

const routers = Router();

routers.get('/assets', stocksController.listAllAssets);

export default routers;
