import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../database/connection';
import { IBalance } from '../interfaces/balance.interface';

const registerBalanceHistory = async (depositInfo: IBalance, balanceType: string): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO xpStocks.balance_history(client_id, amount, balance_type) 
      VALUES (?, ?, ?)`,
    [depositInfo.clientId, depositInfo.amount, balanceType],
  );
  return result as ResultSetHeader;
};

const getAccountInfo = async (clientId: number): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    `SELECT 
      id,
      client_name as clientName,
      account_balance as accountBalance,
      amount_invested as amountInvested
    FROM xpStocks.clients 
    WHERE id = ?`, [clientId],
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

export default { registerBalanceHistory, uptadeBalance, getAccountInfo };
