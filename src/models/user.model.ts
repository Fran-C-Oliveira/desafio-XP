import { ResultSetHeader, RowDataPacket } from 'mysql2';
import IUser from '../interfaces/user.interface';
import connection from '../database/connection';

const createNewUser = async (user: IUser): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO xpStocks.clients (client_name, email, password) VALUES (?, ?, ?)',
    [user.name, user.email, user.password],
  );

  return result as ResultSetHeader;
};

const checkUserByEmail = async (userEmail: string): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    `SELECT 
      id,
      client_name as name,
      email,
      password
    FROM xpStocks.clients 
    WHERE email = ?`, [userEmail],
  );
  return result as RowDataPacket[];
};

export default { createNewUser, checkUserByEmail };
