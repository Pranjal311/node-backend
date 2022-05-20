
import BaseEntity from "../base.entity";
import { User } from "@models/user.model";
import { Types } from "mongoose";


class UserEntity extends BaseEntity {

    #Model: any
    constructor(model: any) {
        super(model);
        this.#Model = model;
    }

    /**
    * @description finds user by email
    * @param email - publicAddress
    */
    async findUserbyEmail(email: string): Promise<any> {
        try {
            let user = await this.findOne(this.#Model, { "email": email }, { email: 1, firstName: 1, phoneNumber: 1 }, { lean: true }, {});
            // if (!user) {
            //      //throw new Error("user already exists!!");
            //     return Promise.reject({ statusCode: 409, type: "USER_NOT_FOUND", message: "User not exists" });

            // }
            return user
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * creates a new user
     * @param payload - user data to insert
     */
    async createUser(payload: IUser.Request.CreateUser): Promise<IUser.User> {
        try {
            return await this.save(this.#Model, payload);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findUserById(userId: string): Promise<IUser.User> {
        try {
            return await this.findOne(this.#Model, { "_id": new Types.ObjectId(userId) }, { email: 1, firstName: 1, phoneNo: 1, createdAt: 1 }, { lean: true }, {});
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const UserV1 = new UserEntity(User);