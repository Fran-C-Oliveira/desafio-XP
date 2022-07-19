import { Router } from 'express';
import investmentRoutes from './investment.routes';
import assetRoutes from './asset.routes';

const routers = Router();

routers.use('/investments', investmentRoutes);
routers.use('/assets', assetRoutes);

export default routers;