/**
 * @file user.v1.routes
 * @description defines routing for v1 user routes
*/

import { celebrate } from "celebrate";
import { Router, Request, Response, NextFunction } from "express";
import BaseRoute from "@baseRoute";
import { UserController } from "@controllers";
import { FIELD_VALIDATION, Helper } from "../../../utils/index"
import { VALIDATION } from "@common";

class V1UserRouteClass extends BaseRoute {

    public path: string;

    constructor(path: string) {
        super();
        this.path = path;
        this.initRoutes();
    }

    get instance(): Router {
        return this.router;
    }

    initRoutes() {

        /** User Create Route */
        this.router.post('/',
            celebrate({
                body: {
                    firstName: FIELD_VALIDATION.FIRST_NAME["required"],
                    email: FIELD_VALIDATION.EMAIL["required"],
                    password: FIELD_VALIDATION.PASSWORD["required"],
                    phoneNo: FIELD_VALIDATION.PHONE_NO["optional"]
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                console.log('in Route');
                Helper.asyncWrapper(UserController.addUser(req, res, next));
            }
        );

        this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            console.log('in Route');
            Helper.asyncWrapper(UserController.getUserDetails(req, res, next));
        })


        this.router.get('/users/listing',
            celebrate({
                query: {
                    searchKey:VALIDATION.GENERAL.PAGINATION.search,
                    pageNo: VALIDATION.GENERAL.PAGINATION.page,
                    limit: VALIDATION.GENERAL.PAGINATION.limit
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                console.log('in Route');
                Helper.asyncWrapper(UserController.getUsersListing(req, res, next));
            })

    }
}

export default new V1UserRouteClass('/');