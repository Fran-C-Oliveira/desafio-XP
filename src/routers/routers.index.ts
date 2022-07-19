import { Router } from 'express';
import investmentRoutes from './investment.routes';
import assetRoutes from './asset.routes';
import balanceRoutes from './balance.routes';

const routers = Router();

routers.use('/investments', investmentRoutes);
routers.use('/assets', assetRoutes);
routers.use('/account', balanceRoutes);

export default routers;