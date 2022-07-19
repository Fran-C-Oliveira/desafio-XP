import sellAssetModel from '../models/sellAsset.model';
import { IAsset } from '../interfaces/asset.interface';


const sellAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const { insertId } = await sellAssetModel.sellAsset(asset);
  return { id: insertId, assetId, quantity, clientId };
};

export default { sellAsset };
