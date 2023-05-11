import express, { NextFunction, Request, Response } from 'express';

export default class Server {

    app: any;
    port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        // DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.get('/api', (req: Request, res: Response, next: NextFunction) => {
            res.status(403).json({
                msg: 'get API'
            })
        });

        this.app.post('/api', (req: Request, res: Response, next: NextFunction) => {
            res.status(403).json({
                msg: 'post API'
            })
        });

        this.app.put('/api', (req: Request, res: Response, next: NextFunction) => {
            res.status(403).json({
                msg: 'put API'
            })
        });

        this.app.delete('/api', (req: Request, res: Response, next: NextFunction) => {
            res.status(403).json({
                msg: 'delete API'
            })
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        });
    }
}