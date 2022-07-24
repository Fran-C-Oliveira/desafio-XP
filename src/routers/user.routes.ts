import { Router } from 'express';

import userController from '../controllers/user.controller';

const routers = Router();

routers.post('/login', userController.createUserToken);

export default routers;
