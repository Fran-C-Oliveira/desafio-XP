import buyAssetModel from '../models/investment.model';
import { IAsset } from '../interfaces/asset.interface';

const buyAsset = async (asset: IAsset) => {
  const { assetId, quantity, clientId } = asset;
  const checkedBalance = await buyAssetModel.getClientAccountInfo(clientId);
  const clientBalance = Number(checkedBalance[0].accountBalance);
  const assetInfos = await buyAssetModel.getAssetInfo(assetId);
  const availableQty = Number(assetInfos[0].available_qty);
  const operationTotal = quantity * Number(assetInfos[0].unit_price);
  const newBalance = clientBalance - operationTotal;
  const newAmountInvested = Number(checkedBalance[0].amountInvested) + operationTotal;
  const newAvailability = availableQty - quantity;
  const clientAssets = await buyAssetModel.getClientAssets(assetId);

  if (clientBalance < operationTotal || clientBalance === undefined) {
    throw new Error(`You don't have the necessary amount for this operation in your account`);
  };
  if (availableQty < quantity) {
    throw new Error(`The total of ${quantity} is not available`); 
  };
  if (clientAssets.length > 0) {
    const newQty = Number(clientAssets[0].quantity) + quantity;
    await buyAssetModel.updateAssetClient(assetId, newQty, clientId);
  } else {
    await buyAssetModel.insertAssetClient(assetId, quantity, clientId); //update client
  };
  await buyAssetModel.uptadeClientBalance(clientId, newBalance); //clients
  await buyAssetModel.updateAsset(assetId, newAvailability); //stocks
  await buyAssetModel.buyAsset(asset); //transactions
  await buyAssetModel.updateClientInvestments(clientId, newAmountInvested) //update client amount_invested
  
  return { message: `${operationTotal} invested in ${assetInfos[0].ticket} successfully`}
};

export default { buyAsset };
