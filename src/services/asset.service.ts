import assetModel from '../models/asset.model';

const getByClientId = async (clientId: number) => {
  const asset = await assetModel.getClientAssets(clientId);
  try {
    return asset;
  } catch(e) {
    if (asset === undefined) {
      throw new Error("This client does not possess any assets");
    };
  }
};

const getAssetById = async (assetId: number) => {
  const asset = await assetModel.getAssetById(assetId);
  try {
    return {
      assetId: assetId,
      quantity: Number(asset[0].available_qty),
      valor: Number(asset[0].unit_price),
    }
  } catch(e) {
    if (asset === undefined) {
      throw new Error('This asset is not available');
    };
  }
};

export default { getByClientId, getAssetById };
