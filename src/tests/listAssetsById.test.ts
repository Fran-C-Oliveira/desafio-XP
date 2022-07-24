import request from 'supertest';
import app from '../app';
import assetService from '../services/asset.service';
import auth from '../auth/jwt.auth';

jest.mock('../services/asset.service');
jest.mock('../auth/jwt.auth');
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

describe('1 - Validations for endpoint GET at assets/clients route', () => {
  beforeEach(() => {
    assetService.getAssetsByClientId = jest.fn();
    auth.checkUserToken = jest.fn();
    (<jest.Mock>auth.checkUserToken).mockReturnValue(validToken);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('Validate if returns error if asset is not available', async () => {
    (<jest.Mock>assetService.getAssetsByClientId).mockReturnValue(undefined);
    const result = await request(app).get('/assets/client/3');
    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual({ "message": 'This client does not possess any assets' });
  });
  it('Validate if it is possible to find a asset by clientId sucessfully', async () => {
    const assets = [
      {
        ticketId: 1,
        quantity: 2,
        clientId: 2,
        valor: 68.37,
      },
      {
        ticketId: 1,
        quantity: 2,
        clientId: 2,
        valor: 68.37,
      },
    ];
    (<jest.Mock>assetService.getAssetsByClientId).mockReturnValue(assets);
    const result = await request(app).get('/assets/client/3');
    
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(assets);
  });
});

describe('2 - Validations for endpoint GET at assets/assetId route', () => {
  beforeEach(() => {
    assetService.getAssetById = jest.fn();
    (<jest.Mock>auth.checkUserToken).mockReturnValue(validToken);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Validate if returns error if asset is not available', async () => {
    (<jest.Mock>assetService.getAssetById).mockReturnValue(undefined);
    const result = await request(app).get('/assets/3');

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual({ "message": 'This asset is not available' });
  });
  
  it('Validate if it is possible to list a asset by its id successfully', async () => {

    const asset = {
      assetId: 3,
      quantity: 100,
      valor: 94.31
    };

    (<jest.Mock>assetService.getAssetById).mockReturnValue(asset);
    const result = await request(app).get('/assets/3');
    
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(asset);
  });
});
