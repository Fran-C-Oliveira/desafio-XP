import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { IAsset } from '../interfaces/asset.interface';
import connection from '../database/connection';

const getAssetInfo = async (ticketId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT * FROM xpStocks.stocks WHERE id = ?', [ticketId],
  );
  return result as RowDataPacket[];
};

const getClientAssets = async (assetId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    `SELECT t.ticket_id, t.qty AS quantity, t.client_id 
    FROM xpStocks.transactions t
    INNER JOIN xpStocks.clients c
    ON t.client_id = c.id
    WHERE t.ticket_id = ?`, [assetId],
  );
  return result as RowDataPacket[];
};

const sellAsset = async (asset: IAsset): Promise<ResultSetHeader> => {
  const assetInfos = await getAssetInfo(asset.assetId);
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO xpStocks.transactions(ticket_id, qty, client_id, unit_price, transaction_type) 
      VALUES (?, ?, ?, ?, ?)`,
    [asset.assetId, asset.quantity, asset.clientId, Number(assetInfos[0].unit_price), "sell"],
  );
  return result as ResultSetHeader;
};

export default { getClientAssets, sellAsset, getAssetInfo };
