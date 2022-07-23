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
});
