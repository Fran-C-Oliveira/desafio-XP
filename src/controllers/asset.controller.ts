import { Request, Response } from 'express';
import assetService from '../services/asset.service';

const getAssetByClientId = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const clientId = Number(id);
  const asset = await assetService.getAssetsByClientId(clientId);
  if (asset === undefined) {
    return res.status(400).json({ message: 'This client does not possess any assets'});
  }
  return res.status(201).json(asset);
};

const getAssetById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const assetId = Number(id);
  const asset = await assetService.getAssetById(assetId);
  if (asset === undefined) {
    return res.status(400).json({ message: 'This asset is not available' });
  }
  return res.status(201).json(asset);
};

const listAllAssets = async (req: Request, res: Response): Promise<Response> => {
  const assetList = await assetService.getAllAssets();
  return res.status(201).json(assetList);
};

export default { getAssetByClientId, getAssetById, listAllAssets };
