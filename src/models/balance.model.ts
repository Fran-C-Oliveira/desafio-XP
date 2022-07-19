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

export default { depositValues };
