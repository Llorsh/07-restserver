import { NextFunction, Request, Response } from "express";

const usersGet = async (req: Request, res: Response, next: NextFunction) => {

    const { name, lastName } = req.query;

    res.json({
        msg: 'get API CONTROLLER',
        name,
        lastName
    })
}

const usersPost = async (req: Request, res: Response, next: NextFunction) => {

    const { name, age } = req.body;

    res.json({
        msg: 'post API CONTROLLER',
        name,
        age
    })
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