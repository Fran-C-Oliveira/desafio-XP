import { Router } from 'express';
import investmentRoutes from './investment.routes';
import assetRoutes from './asset.routes';
import balanceRoutes from './balance.routes';
import userRoutes from './user.routes';

import validateClientToken from '../middlewares/validateClientToken';
import httpErrorMiddleware from '../middlewares/httpException.middleware';

const routers = Router();

routers.use('/investments', httpErrorMiddleware, validateClientToken, investmentRoutes);
routers.use('/stocks', httpErrorMiddleware, validateClientToken, assetRoutes);
routers.use('/account', httpErrorMiddleware, validateClientToken, balanceRoutes);
routers.use('/', httpErrorMiddleware, userRoutes);

export default routers;
