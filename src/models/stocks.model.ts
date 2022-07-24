import { RowDataPacket } from 'mysql2';
import connection from '../database/connection';

const getAllAssets = async (): Promise<RowDataPacket[]> => {
  const [result] = await connection.execute(
    'SELECT * FROM xpStocks.stocks'
  );
  return result as RowDataPacket[];
};

export default { getAllAssets };
