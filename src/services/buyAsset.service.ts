import buyAssetModel from '../models/buyAsset.model';
import { IAsset } from '../interfaces/asset.interface';

const buyAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const { insertId } = await buyAssetModel.buyAsset(asset);
  return { id: insertId, assetId, quantity, clientId };
};

// const updateAssetAvailability = async (assetId: number, quantity: number) => {
//   //debita do total da disponibilidade
//   const availability = await buyAssetModel.getAssetInfo(assetId);
//   return buyAssetModel.updateAsset(Number(availability[0].quantity) - quantity, assetId);
   
// };

export default { buyAsset };
