import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel, { IUser } from "../models/user.model";


interface IPayload {
    uid: string;
    iat: number;
    exp: number;
}

export interface CustomRequest extends Request {
    user?: IUser;
}

export const validateJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY as string) as IPayload;

        const user = await userModel.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        req.user = user;


        next();
    } catch (error) {
        console.log(error);

        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}