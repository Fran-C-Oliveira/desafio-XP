import { Request, Response } from 'express';
import balanceService from '../services/balance.service';

const depositValues = async (req: Request, res: Response): Promise<Response> => {
  if (req.body.amount < 1) {
    return res.status(400).json({ message: 'The amount must be equal or greater than 1,00' });
  } else {
    const deposit = await balanceService.depositValues(req.body);
    return res.status(201).json(deposit);
  }
};

const withdrawValues = async (req: Request, res: Response): Promise<Response> => {
  const withdraw = await balanceService.withdrawValues(req.body);
    return res.status(201).json(withdraw);
};

export default { depositValues, withdrawValues };
