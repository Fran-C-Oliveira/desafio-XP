import balanceModel from '../models/balance.model';
import { IBalance } from '../interfaces/balance.interface';

const depositValues = async (depositInfo: IBalance) => {
  const { clientId, amount } = depositInfo;
  const checkedBalance = await balanceModel.getAccountInfo(clientId);
  
  const clientBalance = Number(checkedBalance[0].account_balance);
  const newBalance = clientBalance + amount;
  await balanceModel.depositValues(depositInfo);
  await balanceModel.uptadeBalance(clientId, newBalance);
  return { message: `${amount} deposited successfully on your account`};
};

const withdrawValues = async (withdrawInfo: IBalance) => {
  const { clientId, amount } = withdrawInfo;
  const checkedBalance = await balanceModel.getAccountInfo(clientId);
  
  const clientBalance = Number(checkedBalance[0].account_balance);
  if (clientBalance < amount) {
    return { message: `You don't have the necessary values for this operation in your account`}
  }
  const newBalance = clientBalance - amount;
  await balanceModel.uptadeBalance(clientId, newBalance);
  await balanceModel.withdrawValues(withdrawInfo);
  return { message: `${amount} withdrawal successfully completed`}
};

const getAccountInfo = async (clientId: number) => {
  const accountInfo = await balanceModel.getAccountInfo(clientId);
  try {
    return { 
      id: clientId,
      clientName: accountInfo[0].client_name,
      accountBalance: Number(accountInfo[0].account_balance),
      amountInvested: Number(accountInfo[0].amount_invested)
    }
  } catch(e) {
    if (!accountInfo) {
      return { message: 'Invalid account number'};
    };
  }  
};

export default { depositValues, withdrawValues, getAccountInfo };
