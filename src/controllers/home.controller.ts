import express from 'express';
import { Request, Response } from 'express';
import ControllerBase from './controllerbase';

export default class HomeController extends ControllerBase {

    constructor() {
        super('/');
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(this.path, this.index);
    }

    get(req: Request, res: Response): Response {
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

    getMany(req: Request, res: Response): any {
        return res.json();
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

    index = (req: Request, res: Response) => {
    }
}