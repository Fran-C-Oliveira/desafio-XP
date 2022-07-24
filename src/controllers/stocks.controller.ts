import { Request, Response } from 'express';
import stocksService from '../services/stocks.service';

const listAllAssets = async (req: Request, res: Response): Promise<Response> => {
  const assetList = await stocksService.getAllAssets();
  return res.status(201).json(assetList);
};

export default { listAllAssets };
