import * as express from 'express';

interface IControllerBase {
    path : String;
    router : express.Router;

    initRoutes() : any;
    get(id : Number) : any;
    getMany() : any;
    create() : any;
    update() : any;
    delete() : any;
}

export default IControllerBase;