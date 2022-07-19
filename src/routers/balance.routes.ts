import { Router } from 'express';

import balanceController from '../controllers/balance.controller';

const routers = Router();

routers.post('/deposit', balanceController.depositValues);
routers.post('/withdraw', balanceController.withdrawValues);
routers.get('/:id', balanceController.getAccountInfo)

export default routers;
