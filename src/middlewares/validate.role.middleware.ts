import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "./validate.jwt.middleware";

export const isAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es Administrador - ROLE`
        })
    }

    next();

}


export const hasRole = (...roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            })
        }

        next();
    }
}