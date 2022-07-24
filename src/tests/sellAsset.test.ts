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

  it('Amount of asset to be sold cannot be greater than the amount available at the client wallet', async () => {
    (<jest.Mock>sellAssetModel.getClientAccountInfo).mockReturnValue(clientBalance);
    (<jest.Mock>sellAssetModel.getAssetInfo).mockReturnValue(assetInfo);
    (<jest.Mock>sellAssetModel.getClientAssets).mockReturnValue(clientAssetsInfo);
    const response = await request(app).post('/investments/sell')
      .set('Content-type', 'application/json')
      .send(sellInfo);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      `You don't have the necessary quantity of this asset in your wallet`
    );
  });
  
  it('It is possible to client to sell assets', async () => {
    (<jest.Mock>sellAssetModel.getClientAccountInfo).mockReturnValue(clientBalance);
    (<jest.Mock>sellAssetModel.getAssetInfo).mockReturnValue(assetInfo);
    (<jest.Mock>sellAssetModel.getClientAssets).mockReturnValue(clientAssetsInfo);

    const newSell = {
      assetId: 3,
      quantity: 5,
      clientId: 1
    };

    const response = await request(app).post('/investments/sell')
      .set('Content-type', 'application/json')
      .send(newSell);

    const operationTotal = newSell.quantity * Number(assetInfo[0].unit_price);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      { message: `You sold ${operationTotal} of ${assetInfo[0].ticket} successfully`}
    );
  });
});
