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

    async get(req: Request, res: Response): Promise<Response> {
        try {
            const data = [{
                title: 'World',
                message: "Hallo",
                params: req.params
            }];
            return res.json({ error: false, data });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: true, message: e });
        }
    }

    async getMany(req: Request, res: Response): Promise<Response> {
        return res.json()
    }
    
    async create(req: Request, res: Response): Promise<Response> {
        return res.json()
    }
    async update(req: Request, res: Response): Promise<Response> {
        return res.json()
    }
    async delete(req: Request, res: Response): Promise<Response> {
        return res.json()
    }    
}