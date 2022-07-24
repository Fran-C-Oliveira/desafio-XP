import userModel from '../models/user.model';
import IUser from '../interfaces/user.interface';
import jwtAuth from '../auth/jwt.auth'


const newUser = async (user: IUser) => {
  const { insertId } = await userModel.createNewUser(user);
  return jwtAuth.generateJWTToken({ id: insertId, ...user });
};

export default { newUser };
