import { Request, Response } from 'express';
import buyAssetService from '../services/buyAsset.service';
import { getErrorMessage, reportError } from '../utils/errorMessage';

const buyAsset = async (req: Request, res: Response): Promise<Response> => {
  try { 
    const asset = await buyAssetService.buyAsset(req.body);
    return res.status(201).json(asset);
  } catch (error) {
    return reportError(res, { message: getErrorMessage(error) });
  };
};

export default { buyAsset };
