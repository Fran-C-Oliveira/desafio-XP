import request from 'supertest';
import app from '../app';
import buyAssetModel from '../models/buyAsset.model';

jest.mock('../models/buyAsset.model');

describe('Test if it is possible to buy stocks', () => {
  beforeEach(() => {
    buyAssetModel.getClientAccountInfo = jest.fn();
    buyAssetModel.getAssetInfo = jest.fn();
    buyAssetModel.getClientAssets = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });




  it('Amount of asset to be purchased cannot be greater than the amount available at the broker', () => {});
  it('purchase amount cannot be greater than the amount available on account', () => {});



  it('It is possible to client to buy assets', () => {});
});