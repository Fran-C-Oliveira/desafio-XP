import balanceModel from '../models/balance.model';
import { IBalance } from '../interfaces/balance.interface';

const depositValues = async (depositInfo: IBalance) => {
  const { clientId, amount } = depositInfo;
  const checkedBalance = await balanceModel.getAccountInfo(clientId);
  const clientBalance = Number(checkedBalance[0].accountBalance);
  const newBalance = clientBalance + amount;
  await balanceModel.registerBalanceHistory(depositInfo, "deposit"); 
  await balanceModel.uptadeBalance(clientId, newBalance);
  return { message: `${amount} deposited successfully on your account`};
};

const withdrawValues = async (withdrawInfo: IBalance) => {
  const { clientId, amount } = withdrawInfo;
  const checkedBalance = await balanceModel.getAccountInfo(clientId);
  
  const clientBalance = Number(checkedBalance[0].accountBalance);
  if (clientBalance < amount) {
    throw new Error();
  }
  const newBalance = clientBalance - amount;
  await balanceModel.uptadeBalance(clientId, newBalance);
  await balanceModel.registerBalanceHistory(withdrawInfo, "withdraw");
  return { message: `${amount} withdrawal successfully completed`}
};

const getAccountInfo = async (clientId: number) => {
  const accountInfo = await balanceModel.getAccountInfo(clientId);
  if (!accountInfo) {
    throw new Error();
  };
  return { 
    id: clientId,
    clientName: accountInfo[0].clientName,
    accountBalance: Number(accountInfo[0].accountBalance),
    amountInvested: Number(accountInfo[0].amountInvested)
  }
};

export default { depositValues, withdrawValues, getAccountInfo };
