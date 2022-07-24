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

export default { createNewUser };
