import { RowDataPacket } from 'mysql2';
import connection from '../database/connection';

const getClientAssets = async (clientId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    `SELECT t.ticket_id AS ticketId, t.qty AS quantity, t.client_id AS clientId, t.unit_price AS valor
    FROM xpStocks.transactions t
    INNER JOIN xpStocks.clients c
    ON t.client_id = c.id
    WHERE c.id = ?`, [clientId],
  );
  return result as RowDataPacket[];
};

const getAssetById = async (ticketId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT * FROM xpStocks.stocks WHERE id = ?', [ticketId],
  );
  return result as RowDataPacket[];
};

export default { getClientAssets, getAssetById };
