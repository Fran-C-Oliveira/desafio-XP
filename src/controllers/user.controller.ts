import { Request, Response } from 'express';
import userService from '../services/user.service';

const createUserToken = async (req: Request, res: Response): Promise<Response> => {
  const token = await userService.newUser(req.body);
  return res.status(201).json({ token });
};

export default {
  createUserToken,
};
