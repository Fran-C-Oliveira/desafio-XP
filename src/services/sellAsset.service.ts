import sellAssetModel from '../models/sellAsset.model';
import { IAsset } from '../interfaces/asset.interface';


const sellAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const checkedBalance = await sellAssetModel.getClientAccountInfo(clientId);
  const clientBalance = Number(checkedBalance[0].account_balance);
  const assetInfos = await sellAssetModel.getAssetInfo(assetId);
  const availableQty = Number(assetInfos[0].available_qty);
  const operationTotal = quantity * Number(assetInfos[0].unit_price);
  const newBalance = clientBalance + operationTotal;
  const newAmountInvested = Number(checkedBalance[0].amount_invested) - operationTotal;
  const newAvailability = availableQty + quantity;
  const clientAssetsInfo = await sellAssetModel.getClientAssets(assetId);

};

export default { sellAsset };
