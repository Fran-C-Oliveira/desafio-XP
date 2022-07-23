import { Request, Response } from 'express';
import sellAssetService from '../services/sellAsset.service';
import { getErrorMessage, reportError } from '../utils/errorMessage';

const sellAsset = async (req: Request, res: Response): Promise<Response> => {
  try {
    const asset = await sellAssetService.sellAsset(req.body);
    return res.status(201).json(asset);
  } catch(error) {
    return reportError(res, { message: getErrorMessage(error) });
  };
};

export default { sellAsset };
