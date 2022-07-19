import balanceModel from '../models/balance.model';
import { IBalance } from '../interfaces/balance.interface';

const depositValues = async (depositInfo: IBalance) => {
  const { clientId, amount } = depositInfo;
  const checkedBalance = await balanceModel.checkClientBalance(clientId);
  
  const clientBalance = Number(checkedBalance[0].account_balance);
  const newBalance = clientBalance + amount;
  await balanceModel.uptadeBalance(clientId, newBalance);
  await balanceModel.depositValues(depositInfo);
  return { message: `${amount} deposited successfully on your account`};
};

const withdrawValues = async (withdrawInfo: IBalance) => {
  const { clientId, amount } = withdrawInfo;
  const checkedBalance = await balanceModel.checkClientBalance(clientId);
  
  const clientBalance = Number(checkedBalance[0].account_balance);
  if (clientBalance < amount) {
    return { message: `You don't have the necessary values for this operation in your account`}
  }
  const newBalance = clientBalance - amount;
  await balanceModel.uptadeBalance(clientId, newBalance);
  return { message: `${amount} withdrawal successfully completed`}
};

export default { depositValues, withdrawValues };
