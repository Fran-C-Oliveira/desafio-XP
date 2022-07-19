import assetModel from '../models/asset.model';

const getByClientId = async (clientId: number) => {
  const asset = await assetModel.getClientAssets(clientId);
  return {
    clientId: clientId,
    ticketId: Number(asset[0].ticket_id),
    quantity: Number(asset[0].quantity),
    valor: Number(asset[0].unit_price),
  }
};

export default { getByClientId };
