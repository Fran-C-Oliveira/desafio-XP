import request from 'supertest';
import app from '../app';
import buyAssetModel from '../models/buyAsset.model';

jest.mock('../models/buyAsset.model');

describe('Test if it is possible to buy stocks', () => {
  const clientBalancePositive = [{
    id: 1,
    clientName: "client01",
    accountBalance: 15000,
    amountInvested: 0
  }];

  const clientBalanceNegative = [{
    id: 1,
    clientName: "client01",
    accountBalance: 5000,
    amountInvested: 0
  }];

  const assetInfo = [{
    id: 3,
    ticket: "XPBR31",
    sector: "Financeiro",
    available_qty: 100,
    unit_price: 94.31,
  }];

  const buyInfo = {
    assetId: 1,
    quantity: 100,
    clientId: 1
  };

  const buyInfoQtyAbove = {
    assetId: 1,
    quantity: 110,
    clientId: 1
  };

  beforeEach(() => {
    buyAssetModel.getClientAccountInfo = jest.fn();
    buyAssetModel.getAssetInfo = jest.fn();
    buyAssetModel.getClientAssets = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Amount of asset to be purchased cannot be greater than the amount available at the broker', async () => {
    (<jest.Mock>buyAssetModel.getClientAccountInfo).mockReturnValue(clientBalancePositive);
    (<jest.Mock>buyAssetModel.getAssetInfo).mockReturnValue(assetInfo);
    (<jest.Mock>buyAssetModel.getClientAssets).mockReturnValue([]);
    const response = await request(app).post('/investments/buy')
    .set('Content-type', 'application/json')
    .send(buyInfoQtyAbove);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      `The total of ${buyInfoQtyAbove.quantity} is not available`
    );
  });
  
  it('purchase amount cannot be greater than the amount available on account', async () => {
    (<jest.Mock>buyAssetModel.getClientAccountInfo).mockReturnValue(clientBalanceNegative);
    (<jest.Mock>buyAssetModel.getAssetInfo).mockReturnValue(assetInfo);
    (<jest.Mock>buyAssetModel.getClientAssets).mockReturnValue([]);

    const response = await request(app).post('/investments/buy')
    .set('Content-type', 'application/json')
    .send(buyInfo);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      `You don't have the necessary amount for this operation in your account`
    );
  });
  
  it('It is possible to client to buy assets', async () => {
    (<jest.Mock>buyAssetModel.getClientAccountInfo).mockReturnValue(clientBalancePositive);
    (<jest.Mock>buyAssetModel.getAssetInfo).mockReturnValue(assetInfo);
    (<jest.Mock>buyAssetModel.getClientAssets).mockReturnValue([]);

    const response = await request(app).post('/investments/buy')
    .set('Content-type', 'application/json')
    .send(buyInfo);

    const operationTotal = buyInfo.quantity * Number(assetInfo[0].unit_price);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      { message: `${operationTotal} invested in ${assetInfo[0].ticket} successfully`}
    );
  });
});
