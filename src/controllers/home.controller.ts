import express from 'express';
import { Request, Response } from 'express';
import IControllerBase from '../interfaces/IControllerBase.interface';

class HomeController implements IControllerBase {
    path = "/"
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.index);
    }

    get() {}
    getMany() {}
    create() {}
    update() {}
    delete() {}

    index = (req: Request, res: Response) => {
        res.json({
            message: 'OK',
            status: 200,
            data: [
                {
                    title: 'Hola',
                    body: 'Mundo'
                }
            ]                
        });
    }
}

export default HomeController;