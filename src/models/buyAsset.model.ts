import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IAsset } from '../interfaces/asset.interface';
import connection from '../database/connection';



const getAssetInfo = async (ticketId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT * FROM xpStocks.stocks WHERE id = ?', [ticketId]
  );
  return result as RowDataPacket[];
}

const buyAsset = async (asset: IAsset): Promise<ResultSetHeader> => {
  const assetInfos = await getAssetInfo(asset.assetId);
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO xpStocks.transactions(ticket_id, qty, client_id, unit_price, transaction_type) VALUES (?, ?, ?, ?, ?)',
    [asset.assetId, asset.quantity, asset.clientId, Number(assetInfos[0].unit_price), "purchase"],
  );
  return result as ResultSetHeader;
};

export default { buyAsset };
