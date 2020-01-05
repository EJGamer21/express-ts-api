import { Router, Request, Response } from 'express';

export default interface IControllerBase {
    path : string;
    router : Router;
    
    get(req: Request, res: Response)     : Response;
    getMany(req: Request, res: Response) : Promise<Response>;
    create(req: Request, res: Response)  : Response;
    update(req: Request, res: Response)  : Response;
    delete(req: Request, res: Response)  : Response;
}