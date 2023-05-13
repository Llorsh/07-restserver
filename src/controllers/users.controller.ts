import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';

import userModel from "../models/user.model";

const usersGet = async (req: Request, res: Response, next: NextFunction) => {

    const { name, lastName } = req.query;

    res.json({
        msg: 'get API CONTROLLER',
        name,
        lastName
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

    res.json({
        msg: 'put API CONTROLLER',
        id
    })
}

const usersDelete = async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        msg: 'delete API CONTROLLER'
    })
}


export { usersGet, usersPost, usersPut, usersDelete }