import dotenv from 'dotenv';
import App from './app';
dotenv.config();

// CONTROLLERS
import HomeController from './controllers/home.controller';
import UserController from './controllers/user.controller';

// PORT
let port : number;
const env: string | undefined = process.env.NODE_ENV;

switch (env) {
    case 'development':
        port = 8081;
        break;
    case 'docker':
        port = 80;
        break;
    case 'production':
        port = 5000;
        break;
    default:
        port = 8080;
        break;
}

function main() {
    // APP INSTANCE
    const app = new App([
        new HomeController(),
        new UserController()
    ], port);

    app.listen(env);
}

main();
