import request from 'supertest';
import app from '../app';
import assetService from '../services/asset.service';

jest.mock('../services/asset.service');
describe("1 - Validations for endpoint GET at assets route", () => {
  beforeEach(() => {
    assetService.getAssetsByClientId = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('Validate if returns error if asset is not available', async () => {
    (<jest.Mock>assetService.getAssetsByClientId).mockReturnValue(undefined);
    const result = await request(app).get('/assets/3');
    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual({"message":"This asset is not available"})
  });
});
