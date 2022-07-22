import request from 'supertest';
import app from '../app';
import assetService from '../services/asset.service';

jest.mock('../services/asset.service');
describe('1 - Validations for endpoint GET at assets/clients route', () => {
  beforeEach(() => {
    assetService.getAssetsByClientId = jest.fn();
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
});
