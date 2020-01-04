import dotenv from 'dotenv';
import App from './app';
dotenv.config();

// CONTROLLERS
import HomeController from './controllers/home.controller';
import UserController from './controllers/user.controller';

// PORT
let port : Number;
switch (process.env.NODE_ENV) {
    case 'development':
        port = 8080;
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


// APP INSTANCE
const app = new App([
    new HomeController(),
    new UserController()
], port);

app.listen();