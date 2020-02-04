import { Request, Response } from 'express';
import ControllerBase from './controllerbase';
import UserModel from './../models/user.model';

export default class UserController extends ControllerBase {
    private userModel: UserModel;

    constructor() {
        super('/user')
        this.userModel = new UserModel();

        this.initRoutes();
    }
    
    initRoutes(): void {
        this.router.get(`${ this.path }/:id`, this.get)
        this.router.get(this.path, this.getMany);
    }

    get = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);

            const data = [
                {
                    id,
                    title: 'Hey',
                    message: 'Mundo'
                }
            ];
            return res.json(data);
        } catch(e) {
            console.error(e);
            return res.status(500).json(e);
        }
    }

    getMany = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data: Promise<any> | boolean = await this.userModel.get();
            console.log(data);
            return res.json(data);
        } catch(e) {
            console.error(e);
            return res.status(500).json(e);
        }
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