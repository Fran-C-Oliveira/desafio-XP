import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';
import HttpException from '../utils/http.exception';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'minhasenhaXP';

const jwtConfig: SignOptions = {
    expiresIn: '15m',
    algorithm: 'HS256'
};
const generateJWTToken = (user: Omit<IUser, "password">) => 
    sign({user}, TOKEN_SECRET, jwtConfig);

const checkUserToken = async (token: string | undefined): Promise<string | JwtPayload>  => {
    if(!token){
        throw new HttpException(401, "jwt malformed");
    }

    try {
        const validate = verify(token, TOKEN_SECRET);
        return validate;
    } catch(error){
        throw new HttpException(401, "jwt malformed");
    }
}

export default { generateJWTToken, checkUserToken };
