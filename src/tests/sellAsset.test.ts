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

  const clientAssetsInfo = [
    {
      ticketId: 3,
      quantity: 10,
      clientId: 1,
      valor: 94.31
    }
  ];

  const assetInfo = [{
    id: 3,
    ticket: "XPBR31",
    sector: "Financeiro",
    available_qty: 50,
    unit_price: 94.31,
  }];

  const sellInfo = {
    assetId: 3,
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

  it('Amount of asset to be sold cannot be zero', async () => {
    (<jest.Mock>sellAssetModel.getClientAccountInfo).mockReturnValue(clientBalance);
    (<jest.Mock>sellAssetModel.getAssetInfo).mockReturnValue(assetInfo);
    (<jest.Mock>sellAssetModel.getClientAssets).mockReturnValue([]);
    const response = await request(app).post('/investments/sell')
      .set('Content-type', 'application/json')
      .send(sellInfo);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      `You dont have this asset in your wallet`
    );
  });

});
