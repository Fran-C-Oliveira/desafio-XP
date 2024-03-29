import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';

import jwtAuth  from '../auth/jwt.auth';

const validateClientToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization;
    const user = await jwtAuth.checkUserToken(token);
    if(!user){
        throw new HttpException(401, "JWT malformed");
    }
    res.locals.user = user;
    next();
}

export default validateClientToken;
