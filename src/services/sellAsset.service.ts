import sellAssetModel from '../models/investment.model';
import { IAsset } from '../interfaces/asset.interface';

const sellAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const checkedBalance = await sellAssetModel.getClientAccountInfo(clientId);
  const clientBalance = Number(checkedBalance[0].accountBalance);
  const assetInfos = await sellAssetModel.getAssetInfo(assetId);
  const availableQty = Number(assetInfos[0].available_qty);
  const operationTotal = quantity * Number(assetInfos[0].unit_price);
  const newBalance = clientBalance + operationTotal;
  const newAmountInvested = Number(checkedBalance[0].amountInvested) - operationTotal;
  const newAvailability = availableQty + quantity;
  const clientAssetsInfo = await sellAssetModel.getClientAssets(assetId);

  if (clientAssetsInfo.length === 0) { 
    throw new Error(`You dont have this asset in your wallet`);
  };
  
  if (clientAssetsInfo.length > 0) {
    const clientAssetQty = Number(clientAssetsInfo[0].quantity)
    const newQty = clientAssetQty - quantity;
    if (clientAssetQty < quantity) { 
      throw new Error(`You don't have the necessary quantity of this asset in your wallet`);
    }
    await sellAssetModel.updateAssetClient(assetId, newQty, clientId); // update asset_client values
  }

  await sellAssetModel.uptadeClientBalance(clientId, newBalance); //clients
  await sellAssetModel.updateAsset(assetId, newAvailability); //stocks
  await sellAssetModel.sellAsset(asset); //transactions
  await sellAssetModel.updateClientInvestments(clientId, newAmountInvested) //update client amount_invested

  return { message: `You sold ${operationTotal} of ${assetInfos[0].ticket} successfully`}
};

export default { sellAsset };
