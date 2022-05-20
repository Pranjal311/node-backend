/**
 * @file routes/index
 * @description exposes routing paths
*/

import { Router } from "express";

import userRoutes from "./user/v1";

import BaseRoute from "./base.routes";


class Routes extends BaseRoute {

    public path = '/api';

    constructor() {
        super();
        this.init();
    }

    get instance(): Router {
        return this.router;
    }

    /** initializes routes */
    private init() {
        this.router.use(userRoutes.path, userRoutes.instance);
    }
}

 export default new Routes();