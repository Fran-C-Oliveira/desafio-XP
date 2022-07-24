import request from 'supertest';
import app from '../app';
import stocksService from '../services/stocks.service';
import auth from '../auth/jwt.auth';

jest.mock('../services/stocks.service');
jest.mock('../auth/jwt.auth');
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

describe('Validations for endpoint GET at stocks/assets route', () => {
  beforeEach(() => {
    stocksService.getAllAssets = jest.fn();
    auth.checkUserToken = jest.fn();
    (<jest.Mock>auth.checkUserToken).mockReturnValue(validToken);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('Validate if it is possible to list all assets successfully', async () => {

    const assetList = [
      {
        id: 3,
        ticket: "XPBR31",
        sector: "Financeiro",
        available_qty: 90,
        unit_price: 94.31
      },
      {
        id: 4,
        ticket: "MGLU3",
        sector: "Consumo Cíclico",
        available_qty: 100,
        unit_price: 2.78
      },
      {
        id: 5,
        ticket: "RAIL3",
        sector: "Bens Industriais",
        available_qty: 100,
        unit_price: 15.34
      },
    ];

    (<jest.Mock>stocksService.getAllAssets).mockReturnValue(assetList);
    const result = await request(app).get('/stocks/assets');
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(assetList);
  });
});
