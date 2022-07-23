import request from 'supertest';
import app from '../app';
import sellAssetModel from '../models/investment.model';

jest.mock('../models/investment.model');

describe('Test if it is possible to sell stocks', () => {
  const clientBalance = [{
    id: 1,
    clientName: "client01",
    accountBalance: 5000,
    amountInvested: 0
  }];


  const assetInfo = [{
    id: 3,
    ticket: "XPBR31",
    sector: "Financeiro",
    available_qty: 50,
    unit_price: 94.31,
  }];

  const sellInfo = {
    assetId: 1,
    quantity: 20,
    clientId: 1
  };

  beforeEach(() => {
    sellAssetModel.getClientAccountInfo = jest.fn();
    sellAssetModel.getAssetInfo = jest.fn();
    sellAssetModel.getClientAssets = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

});
