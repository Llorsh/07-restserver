import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';

import userModel from "../models/user.model";
import { CustomRequest } from "../middlewares/validate.jwt.middleware";

const usersGet = async (req: Request, res: Response, next: NextFunction) => {

    const { limit = 5, page = 0 } = req.query;

    const query = { status: true };

    const [users, count] = await Promise.all([
        userModel.find(query)
            .limit(Number(limit))
            .skip(Number(page) * Number(limit)),
        userModel.countDocuments(query)
    ]);

    res.json({
        msg: 'get API CONTROLLER',
        count,
        users

    })
}

const usersPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, img, role } = req.body;

        const user = new userModel({ name, email, password, img, role });

        const emailExist = await userModel.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                msg: 'Email already exists'
            })
        }
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.json({
            msg: 'User created successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error creating user',
            error
        })
    }
}

const usersPut = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const { _id, password, google, ...rest } = req.body;

    // TODO validar contra base de datos
    if (password) {
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await userModel.findByIdAndUpdate(id, rest);

    res.json({
        msg: 'Usuario actualizado correctamente',
        user
    })
}

const usersDelete = async (req: CustomRequest, res: Response, next: NextFunction) => {

    const { id } = req.params;

    console.log( req.user)

    const user = await userModel.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: 'Usuario eliminado correctamente',
        user
    })
}


export { usersGet, usersPost, usersPut, usersDelete }