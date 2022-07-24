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
    const clientId = 11;
    const user = {
      id: 11,
      email: 'client22@client04.com',
      name: 'client05',
      password: 'client05pass',
    };
    (<jest.Mock>userModel.checkUserByEmail).mockReturnValue([]);
    (<jest.Mock>userModel.createNewUser).mockReturnValue(clientId);
    (<jest.Mock>tokenAuth.generateJWTToken).mockReturnValue(token);

    const response = await request(app).post('/register')
      .set('Content-type', 'application/json')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' });
  });
});

describe('2 - Test login', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  const userExists = [{
    id: 10,
    name: "client10",
    email: "client10@client10.com",
    password: "client10pass"
  }];

  const login = {
    email: "client10@client10.com",
    password: "client10pass"
  };

  const wrongEmail = {
    email: "client@client10.com",
    password: "client10pass"
  };

  const wrongPass = {
    email: "client10@client10.com",
    password: "clientpass"
  };

  beforeEach(() => {
    userModel.checkUserByEmail = jest.fn();
    tokenAuth.generateJWTToken = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Test if it is not possible to login with invalid user email', async () => {
    (<jest.Mock>userModel.checkUserByEmail).mockReturnValue(userExists);
    (<jest.Mock>tokenAuth.generateJWTToken).mockReturnValue(token);

    const responseEmail = await request(app).post('/login')
      .set('Content-type', 'application/json')
      .send(wrongEmail);

      expect(responseEmail.statusCode).toBe(400);
      expect(responseEmail.body).toEqual('Invalid email');
  });

  it('Test if it is not possible to login with invalid user password', async () => {
    (<jest.Mock>userModel.checkUserByEmail).mockReturnValue(userExists);
    (<jest.Mock>tokenAuth.generateJWTToken).mockReturnValue(token);

      const responsePassword = await request(app).post('/login')
      .set('Content-type', 'application/json')
      .send(wrongPass);

      expect(responsePassword.statusCode).toBe(400);
      expect(responsePassword.body).toEqual('Invalid password');
  });

  it('Test if it is possible to login', async () => {
    (<jest.Mock>userModel.checkUserByEmail).mockReturnValue(userExists);
    (<jest.Mock>tokenAuth.generateJWTToken).mockReturnValue(token);

      const response = await request(app).post('/login')
      .set('Content-type', 'application/json')
      .send(login);

    expect(response.statusCode).toBe(201);
  });
});
