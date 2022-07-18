import { Router } from 'express';
import investmentRoutes from './investment.routes';

const routers = Router();

routers.use('/investments', investmentRoutes);

export default routers;