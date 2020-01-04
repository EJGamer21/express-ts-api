import express, { Request, Response } from 'express';
import IControllerBase from './../interfaces/IControllerBase.interface';

class UserController implements IControllerBase {
    public path = "/user";
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }
    
    initRoutes() {
        this.router.get(this.path, this.getUser);
    }

    get() {}
    getMany() {}
    create() {}
    update() {}
    delete() {}

    getUser = (req: Request, res: Response) => {
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

export default UserController;