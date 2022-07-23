import { Request, Response } from 'express';
import sellAssetService from '../services/sellAsset.service';

const sellAsset = async (req: Request, res: Response): Promise<Response> => {
  const asset = await sellAssetService.sellAsset(req.body);
  return res.status(201).json(asset);
};

export default { sellAsset };
