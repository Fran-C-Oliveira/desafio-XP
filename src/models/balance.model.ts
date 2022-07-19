import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../database/connection';
import { IBalance } from '../interfaces/balance.interface';

const depositValues = async (depositInfo: IBalance): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO xpStocks.balance_history(client_id, amount, balance_type) 
      VALUES (?, ?, ?)`,
    [depositInfo.clientId, depositInfo.amount, "deposit"],
  );
  return result as ResultSetHeader;
};

const checkClientBalance = async (clientId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT * FROM xpStocks.clients WHERE id = ?', [clientId],
  );
  return result as RowDataPacket[];
};

const uptadeBalance = async (clientId: number, newBalance: number): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `UPDATE xpStocks.clients SET account_balance = ? WHERE id = ?`,
    [newBalance, clientId],
  );
  return result as ResultSetHeader;
};

export default { depositValues, uptadeBalance, checkClientBalance };
