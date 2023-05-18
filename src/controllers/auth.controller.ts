import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import userModel from "../models/user.model";
import { generateJWT } from "../helpers/generate.jwt";


const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    try {

        // verificar email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            })
        }

        //verificar usuario activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct - status: false'
            })
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            })
        }

        //generar JWT

        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error login user',
            error
        })
    }


}



export { login };