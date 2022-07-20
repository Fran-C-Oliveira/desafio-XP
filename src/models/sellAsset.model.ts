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
    `SELECT ac.ticket_id, ac.qty AS quantity, ac.client_id 
    FROM xpStocks.asset_client ac
    INNER JOIN xpStocks.clients c
    ON ac.client_id = c.id
    WHERE ac.ticket_id = ?`, [assetId],
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

const getClientAccountInfo = async (clientId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT * FROM xpStocks.clients WHERE id = ?', [clientId],
  );
  return result as RowDataPacket[];
};

const updateAsset = async (assetId: number, quantity: number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'UPDATE xpStocks.stocks SET available_qty = ? WHERE id = ?', 
    [quantity, assetId],
  );
  return result as ResultSetHeader;
};

const uptadeClientBalance = async (clientId: number, newBalance: number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE xpStocks.clients SET account_balance = ? WHERE id = ?`,
    [newBalance, clientId],
  );
  return result as ResultSetHeader;
};

const updateClientInvestments = async (clientId: number, amountInvested: number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE xpStocks.clients SET amount_invested = ? WHERE id = ?`,
    [amountInvested, clientId],
  );
  return result as ResultSetHeader;
};

export default {
  getClientAssets,
  sellAsset,
  getAssetInfo,
  getClientAccountInfo,
  updateAsset,
  uptadeClientBalance,
  updateClientInvestments,
};
