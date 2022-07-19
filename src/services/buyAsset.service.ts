import buyAssetModel from '../models/buyAsset.model';
import { IAsset } from '../interfaces/asset.interface';

const buyAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const checkedBalance = await buyAssetModel.getClientAccountInfo(clientId);
  const clientBalance = Number(checkedBalance[0].account_balance);
  const assetInfos = await buyAssetModel.getAssetInfo(assetId);
  const availableQty = Number(assetInfos[0].available_qty);
  const operationTotal = quantity * Number(assetInfos[0].unit_price);
  const newBalance = clientBalance - operationTotal;
  const newAmountInvested = Number(checkedBalance[0].amount_invested) + operationTotal;
  const newAvailability = availableQty - quantity;
  
  if(clientBalance < operationTotal || undefined) {
    return { message: `You don't have the necessary values for this operation in your account`}
  };
  if (availableQty < quantity) {
    return { message: `The total of ${quantity} is not available`}; 
  };
  await buyAssetModel.uptadeClientBalance(clientId, newBalance); //clients
  await buyAssetModel.updateAsset(assetId, newAvailability); //stocks
  await buyAssetModel.buyAsset(asset); //transactions
  await buyAssetModel.updateClientInvestments(clientId, newAmountInvested) //update client amount_invested
  
  return { message: `${operationTotal} invested in ${assetInfos[0].ticket} successfully`}
};

export default { buyAsset };
