import userModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import { generateJWTToken } from '../auth/jwt.auth'


const newUser = async (user: IUser) => {
  const { insertId } = await userModel.createNewUser(user);
  return generateJWTToken({ id: insertId, ...user });
};

export default { newUser };
