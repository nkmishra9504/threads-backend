import { Request, Response, Router } from "express";
import asyncHandler from "../errors/asyncHandler";
import { validateObjectData } from "../helpers/validation";
import { login_schema } from "../validation/authValidation";
import CustomError from "../errors/customError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { response200 } from "../helpers/utils";
import verifyJWT from "../middlewares/authentication";
import { CustomRequest } from "../index";
import { User } from "../schemas/schema";

const router = Router();

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
    const reqData = req.body;

    const validation = validateObjectData(login_schema, reqData);
    if (validation.error) throw new CustomError(validation.error.message, 406, validation.error.details[0].context?.key);

    res.json(reqData)

    //find employee
    const where = {
        email: reqData.email,
        soft_delete: false,
        email_verified: true,
        is_active: true
    }
    // const user = await User.findOne(where);
    // if (!user) throw new CustomError('Invalid credentials', 401);

    // // check password
    // const validatePassword = user.password && await bcrypt.compare(reqData.password, user.password);
    // if (!validatePassword) throw new CustomError('Invalid credentials', 401);

    // let payload = {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     mobile: user.mobile,
    //     gender: user.gender,
    //     profile_image: user.profile_image,
    // };

    // let secretkey = config.get('jwt_secretkey');
    // if (!secretkey) throw new CustomError("JWT Secret key not defined", 500);

    // //Generate jwt
    // const token = `Bearer ${jwt.sign(payload, String(config.get('jwt_secretkey')), { expiresIn: '30d' })}`;

    // res.setHeader("authorization", token);
    // res.setHeader("Access-Control-Expose-Headers", "*");
    // let response = response200("Login successful", payload);
    // return res.status(response[0]).json(response[1]);
}));

router.get('/verify-session', verifyJWT, asyncHandler(async (req: CustomRequest, res: Response) => {
    const user = req.user;

    const response = response200("Session verified", { user });
    return res.status(response[0]).json(response[1]);
}));

export default router;