import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/customError";
import config from 'config';
import { response406 } from '../helpers/utils';
import { CustomRequest } from '../index';

// export interface AuthenticatedRequest extends Request {
//     user?: JwtPayload;
// }

const verifyJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const payload = req.headers.authorization;

    if (!payload) {
        const response = response406("Authorization token not present in the header");
        return res.status(response[0]).json(response[1]);
    }

    const token = payload.split(" ");
    if (token.length != 2) {
        const response = response406("Invalid authorization token");
        return res.status(response[0]).json(response[1]);
    }

    try {
        const secretkey = String(config.get('jwt_secretkey')) || "";
        const data = jwt.verify(token[1], secretkey) as JwtPayload;
        delete data.iat;
        delete data.exp
        req.user = data;
        next();
    }
    catch (err: any) {
        const response = response406(err.message);
        return res.status(response[0]).json(response[1]);
    }
}

export default verifyJWT;