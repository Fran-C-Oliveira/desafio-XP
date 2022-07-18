import buyAssetModel from '../models/buyAsset.model';
import { IAsset } from '../interfaces/asset.interface';

const buyAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const { insertId } = await buyAssetModel.buyAsset(asset);
  return { id: insertId, assetId, quantity, clientId };
};

export default { buyAsset };
