import userModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import jwtAuth from '../auth/jwt.auth'

const createNewUser = async (user: IUser) => {
  const userExists = await userModel.checkUserByEmail(user.email);
  if (userExists.length !== 0) {
    throw new Error('User already registered');
  }
  const { insertId } = await userModel.createNewUser(user);
  return jwtAuth.generateJWTToken({ id: insertId, ...user });
};

const createLoginToken = async (user: IUser) => {
  const userInfo = await userModel.checkUserByEmail(user.email);
  const email = userInfo[0].email;
  const password = userInfo[0].password;
  const userId = userInfo[0].id;
  if (user.email !== email) {
    throw new Error('Invalid email');
  };
  if (user.password !== password) {
    throw new Error('Invalid password');
  };
  return jwtAuth.generateJWTToken({ id: userId, ...user });
};

export default { createNewUser , createLoginToken };
