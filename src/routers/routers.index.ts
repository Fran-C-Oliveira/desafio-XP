import { Router } from 'express';
import investmentRoutes from './investment.routes';

const routers = Router();

routers.use('/investment', investmentRoutes);



export default routers;