import { ResultSetHeader } from 'mysql2';
import IUser from '../interfaces/user.interface';
import connection from '../database/connection';

const createNewUser = async (user: IUser): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO xpStocks.clients (client_name, email, password) VALUES (?, ?, ?)',
    [user.name, user.email, user.password],
  );

  return result as ResultSetHeader;
};

export default { createNewUser };
