import { RowDataPacket } from 'mysql2';
import connection from '../database/connection';

const getClientAssets = async (clientId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    `SELECT t.ticket_id, t.qty AS quantity, t.client_id, t.unit_price 
    FROM xpStocks.transactions t
    INNER JOIN xpStocks.clients c
    ON t.client_id = c.id
    WHERE c.id = ?`, [clientId],
  );
  return result as RowDataPacket[];
};

export default { getClientAssets };
