

import { Request, Response, NextFunction } from "express";
import BaseClass from "../../base.controller";
import { UserV1 } from "@entity"
import { Helper } from "@services"
import { RESPONSE } from "@common"
import { UserBuilder } from "../../../builders/index"

class UserClass extends BaseClass {

    constructor() {
        super();
    }

    /**
     * @description-create new User
     * @param req 
     * @param res 
     * @param next 
     */
    async addUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            let payload: IUser.Request.CreateUser = req.body
            console.log(payload);
            let { email } = req.body;
            //CHECK IF EMAIL EXISTS OR NOT?
            let user = await UserV1.findUserbyEmail(email);
            console.log("!!isUserExists",user);
            //EMAIL EXISTS?
            if (user) {
                return this.errorResponse(res, { message: 'Email Already Exists!!' });
            }
            //ENCRYPT PASSWORD TO HASH
            payload["hash"] = Helper.hashPassword(payload.password);
            console.log("payload==>", payload)
            let response = await UserV1.createUser(payload);
            console.log(response);
            return this.sendResponse(res, RESPONSE.USER('en-US').LOGIN_SUCCESSFULLY, response);
        } catch (err) {
            next(err);
        }
    }

    async getUserDetails(req: Request, res: Response, next: NextFunction) {
        try {
            let { id: userId } = req.params;

            if (!userId) {
                return this.errorResponse(res, { message: 'Pleaser enter userId ' });
            }
            //FETCH USER DETAILS..
            let userDetails: IUser.User = await UserV1.findUserById(userId);
            if (!userDetails) {
                return this.sendResponse(res,RESPONSE.USER('en-US').NOT_FOUND,{});
            }
            return this.sendResponse(res, RESPONSE.USER('en-US').LOGIN_SUCCESSFULLY, userDetails);
        } catch (err) {
            next(err);
        }
    }

    async getUsersListing(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.query);
            //res.send("success");
            let pipeline=await UserBuilder.buildUsersList(req.query);
            //console.log(pipeline);
            let response=await UserV1.PaginateAndFetchListing(pipeline,req.query);
            return this.sendResponse(res,RESPONSE.USER('en-US').LOGIN_SUCCESSFULLY,response);
        } catch (err) {
            next(err);
        }
    }
}



export const UserController = new UserClass();