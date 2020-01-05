import express, { Request, Response } from 'express';
import IControllerBase from './../interfaces/IControllerBase.interface';
import IModelBase from './../interfaces/IModelBase.interface';

export default abstract class ControllerBase implements IControllerBase {
    path: string;
    router: express.Router;

    constructor(path: string) {
        this.path = path;
        this.router = express.Router();
    }

    get(req: Request, res: Response): Response {
        try {
            const data = [{
                title: 'World',
                message: "Hallo"
            }];
            return res.json(data);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: e
            })
        }
    }

    getMany(req: Request, res: Response): any {
        return res.json()
    }
    
    create(req: Request, res: Response): Response {
        return res.json()
    }
    update(req: Request, res: Response): Response {
        return res.json()
    }
    delete(req: Request, res: Response): Response {
        return res.json()
    }

    
}