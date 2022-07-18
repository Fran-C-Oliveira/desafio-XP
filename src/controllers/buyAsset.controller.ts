import { Request, Response } from 'express';
import buyAssetService from '../services/buyAsset.service';

const buyAsset = async (req: Request, res: Response): Promise<Response> => {
  const asset = await buyAssetService.buyAsset(req.body);
  return res.status(201).json(asset);
};

export default { buyAsset };