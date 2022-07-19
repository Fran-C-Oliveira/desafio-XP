import { Request, Response } from 'express';
import depositService from '../services/balance.service';

const depositValues = async (req: Request, res: Response): Promise<Response> => {
  const deposit = await depositService.depositValues(req.body);
  return res.status(201).json(deposit);
};

export default { depositValues };