import { Request, Response } from 'express';
import assetService from '../services/asset.service';

const getAssetByClientId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const clientId = Number(id);
  const asset = await assetService.getByClientId(clientId);
  return res.status(201).json(asset);
};

export default { getAssetByClientId };
