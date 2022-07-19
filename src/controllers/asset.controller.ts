import { Request, Response } from 'express';
import assetService from '../services/asset.service';

const getAssetByClientId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const clientId = Number(id);
  const asset = await assetService.getByClientId(clientId);
  if (asset === undefined) {
    return res.status(400).json({ message: 'This client does not possess any assets'});
  }
  return res.status(201).json(asset);
};

export default { getAssetByClientId };
