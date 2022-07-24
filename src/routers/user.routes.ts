import { Router } from 'express';

import userController from '../controllers/user.controller';

const routers = Router();

routers.post('/register', userController.createNewUser);
routers.post('/login', userController.createLoginToken);

export default routers;
