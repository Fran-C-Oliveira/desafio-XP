import request from 'supertest';
import app from '../app';
import balanceModel from '../models/balance.model';

jest.mock('../models/balance.model');
describe('It is possible to deposit into the account', () => {
  const previewBalanceInfo = [{
    id: 1,
    clientName: "client01",
    accountBalance: 1500,
    amountInvested: 0
  }];
  const deposit = {
    clientId: 1,
    amount: 500
  };

  beforeEach(() => {
    balanceModel.getAccountInfo = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('When depositing, the amounts are registered in the account', async () => {
  (<jest.Mock>balanceModel.getAccountInfo).mockReturnValue(previewBalanceInfo);
  
  const response = await request(app).post('/account/deposit')
    .set('Content-type', 'application/json')
    .send(deposit);
  
  expect(response.statusCode).toBe(201);
  expect(response.body).toEqual(
      { message: `${deposit.amount} deposited successfully on your account` }
    );
  });
  it('When depositing, the amounts are correctly recorded in the account', async () => {
    (<jest.Mock>balanceModel.getAccountInfo).mockReturnValue(previewBalanceInfo);

    const response = await request(app).post('/account/deposit')
      .set('Content-type', 'application/json')
      .send(deposit);

    const afterBalanceInfo = previewBalanceInfo[0].accountBalance + deposit.amount;

    expect(response.statusCode).toBe(201);
    expect(afterBalanceInfo).toEqual(2000);
  });
});

describe('It is possible to withdraw from the account', () => {
  const previewBalanceInfo = [{
    id: 1,
    clientName: "client01",
    accountBalance: 1500,
    amountInvested: 0
  }];

  beforeEach(() => {
    balanceModel.getAccountInfo = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('It is possible to make a withdrawal from the account', async () => {
    const withdraw = {
      clientId: 1,
      amount: 1000
    };
    const afterBalanceInfo = previewBalanceInfo[0].accountBalance - withdraw.amount;
    (<jest.Mock>balanceModel.getAccountInfo).mockReturnValue(previewBalanceInfo);
    const response = await request(app).post('/account/withdraw')
      .set('Content-type', 'application/json')
      .send(withdraw);
  
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: `${withdraw.amount} withdrawal successfully completed` });
    expect(afterBalanceInfo).toEqual(500);
  });
  
  it('It is not possible to withdraw an amount greater than what is available', async () => {
    const withdraw = {
      clientId: 1,
      amount: 2000
    };
    
    (<jest.Mock>balanceModel.getAccountInfo).mockReturnValue(previewBalanceInfo);
    const response = await request(app).post('/account/withdraw')
      .set('Content-type', 'application/json')
      .send(withdraw);
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      { message: `You don't have the necessary values for this operation in your account`}
    );
  });
});

describe('You can track account information', () => {
  const accountInfo = [{
    id: 1,
    clientName: "client01",
    accountBalance: 1500,
    amountInvested: 0
  }];

  beforeEach(() => {
    balanceModel.getAccountInfo = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('When the clientId is valid', async () => {
    (<jest.Mock>balanceModel.getAccountInfo).mockReturnValue(accountInfo);
    const result = await request(app).get('/account/1');
    
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(accountInfo[0]);
  });
  
  it('When the clientId is not valid', async () => {
     const invalidAccountId = undefined || [];
    (<jest.Mock>balanceModel.getAccountInfo).mockReturnValue(invalidAccountId);
    const result = await request(app).get('/account/1500');
    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual({ message: 'Invalid account number' });
  });
});
