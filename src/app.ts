/**
 * @file app
 * @description application start code
*/

// resolves all the modules
import 'module-alias/register';

import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";
import routes from "@routes";
import { Database } from '@services';
import Middleware from "@middlewares";
export * as config from "./config/index";



class Application {

    private app: express.Application;

    constructor() {
        this.app = express(); // initialize the express instance
        console.log("inside constructor!!!!");
        this.init();
    }

    /** gets the app instance */
    get instance(): express.Application {
        return this.app;
    }


    /** initializes app components */
    async init() {
        try {
            await Database.connectToDb(); // connect to database
            this.useMiddlewares(); // use middlewares for requests
            this.useRoutes(); // use routing
        } catch (error) {
            console.log("ERROR=>", error);
        }
    }

    /** uses the middlewares for the app */
    useMiddlewares() {
        this.app.use(cors()); // handles cross origin resouce sharing
        this.app.use(bodyParser.json()); // parses the incoming json requests
        this.app.use(bodyParser.urlencoded({ extended: false })); // parses the incoming query requests
        this.app.use(helmet()); // makes apps more secure
        this.app.set('views', express.static(process.cwd() + '/views'))
        console.log((process.cwd() + '/views'))
        this.app.set('view engine', 'hbs')
        //this.app.use(Middleware.HeadersValidator)
    }

    /** uses the routes for the app */
    useRoutes() {
        this.app.use(routes.path, routes.instance); // uses the in-app routing
        this.app.use(Middleware.InvalidRoute); // invalid route handler
        this.app.use(Middleware.ErrorHandler); // global error handler

    }
}

export default new Application();