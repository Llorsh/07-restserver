import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from '../routes/user.routes';

export default class Server {

    app: any;
    port: string | number;
    paths: { users: string; };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            users: '/api/users'
        };

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parsed del body
        this.app.use(express.json());

        // DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use(this.paths.users, userRoutes)
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        });
    }
}