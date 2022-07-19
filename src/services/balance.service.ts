import balanceModel from '../models/balance.model';
import { IBalance } from '../interfaces/balance.interface';

const depositValues = async (depositInfo: IBalance) => {
  const { clientId, amount } = depositInfo;
  const { insertId } = await balanceModel.depositValues(depositInfo);
  return { id: insertId, clientId, amount };
};

export default { depositValues };
