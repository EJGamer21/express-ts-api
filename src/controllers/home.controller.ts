import { Request, Response } from 'express';
import ControllerBase from './controllerbase';

export default class HomeController extends ControllerBase {

    constructor() {
        super('/');
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(this.path, this.getMany);
    }

    async get(req: Request, res: Response): Promise<Response> {
        try {
            const data = [
                {
                    title: 'Hola',
                    body: 'Mundo'
                }];

            return res.json(data);
        } catch(e) {
            console.error(e);
            return res.status(500).json(e);
        }
    }

    async getMany(req: Request, res: Response): Promise<Response> {
        return res.json();
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