import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import IControllerBase from './interfaces/IControllerBase.interface';

class App {
    public app: Application;
    public port: Number;

    constructor(controllers : Array<IControllerBase>, port : Number) {
        this.app = express();
        this.port = port;

        this.initMiddlewares();
        this.initControllers(controllers);
    }
    
    private initMiddlewares() {
        const middlewares = [
            bodyParser.json(),
            bodyParser.urlencoded({ extended: false }),
            cors()
        ];
        this.app.use(middlewares);
    }

    private initControllers(controllers : Array<IControllerBase>) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port: http://localhost:${this.port}`);
        });
    }
}

export default App;