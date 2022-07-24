import { Request, Response } from 'express';
import userService from '../services/user.service';
import { getErrorMessage, reportError } from '../utils/errorMessage';

const createNewUser = async (req: Request, res: Response): Promise<Response> => {
  try { 
    const token = await userService.createNewUser(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    return reportError(res, { message: getErrorMessage(error) });
  };
};

export default { createNewUser };
