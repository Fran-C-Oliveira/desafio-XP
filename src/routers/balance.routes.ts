import { Router } from 'express';

import balanceController from '../controllers/balance.controller';

const routers = Router();

routers.post('/deposit', balanceController.depositValues);

export default routers;
