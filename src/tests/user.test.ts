import request from 'supertest';
import app from '../app';
import userModel from '../models/user.model';
import tokenAuth from '../auth/jwt.auth'

jest.mock('../models/user.model');

describe('1 - Test register new user', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  const newUser = {
    name: "client05",
    email: "client05@client04.com",
    password: "client05pass"
  };

  const userExists = [{
    id: 10,
    name: "client10",
    email: "client10@client10.com",
    password: "client10pass"
  }];

  beforeEach(() => {
    userModel.checkUserByEmail = jest.fn();
    userModel.createNewUser = jest.fn();
    tokenAuth.generateJWTToken = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test if is not possible to create a user that already exists', async () => {
    (<jest.Mock>userModel.checkUserByEmail).mockReturnValue(userExists);
    (<jest.Mock>userModel.createNewUser).mockReturnValue(userExists);
    const response = await request(app).post('/register')
      .set('Content-type', 'application/json')
      .send(newUser);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual('User already registered');
  });

  it('Test if is possible to create a new user', async () => {

  });


});

describe('2 - Test login', () => {

  it('', () => {});
});