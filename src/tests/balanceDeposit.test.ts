import request from 'supertest';
import app from '../app';
import balanceModel from '../models/balance.model';

jest.mock('../models/balance.model');
describe('É possível depositar na conta', () => {
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

});

