import stocksModel from '../models/stocks.model';

const getAllAssets = async () => {
  const assetList = await stocksModel.getAllAssets();
  return assetList;
};

export default { getAllAssets };
