import assetModel from '../models/asset.model';

const getAssetsByClientId = async (clientId: number) => {
  let asset;
  try {
    asset = await assetModel.getClientAssets(clientId);
    return asset;
  } catch(e) {
    if (asset === undefined) {
      throw new Error("This client does not possess any assets");
    };
  }
};

const getAssetById = async (assetId: number) => {
  let asset;
  try {
    asset = await assetModel.getAssetById(assetId);
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

const getAllAssets = async () => {
  const assetList = await assetModel.getAllAssets();
  return assetList;
};

export default { getAssetsByClientId, getAssetById, getAllAssets };
