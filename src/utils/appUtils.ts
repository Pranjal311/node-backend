/**
 * @name helper.service
 * @description defines helper functions
*/

import fs from "fs";
import request from "request";
import { randomBytes, scryptSync } from 'crypto';
import * as path from "path";
//import { Common } from "typings/common.typing";
import { Request, Response, NextFunction } from "express";

export const Helper = {

    /** converts the sort type to mongoose sort object */
    convertSortType: function (sortType: string) {
        return sortType === 'asc' ? 1 : -1;
    },

    /** 
     * checks if a file(or directory) exists
     * @param fileName
     */
    checkFileExists: function (fileName: string) {
        return !!fs.existsSync(path.join(process.cwd(), fileName));
    },

    /** 
     * creates new directory
     * @param directory - string or array of strings
     */
    createNewDirectory: function (directory: string | string[]) {
        if (typeof directory === 'string') {
            !fs.existsSync(directory) && fs.mkdirSync(directory, { recursive: true });
        } else {
            directory.forEach(dir => {
                !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
            });
        }
        return true;
    },

    /**
     * makes a get request
     * @param url
     */
    async getRequest(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get(url, (err, res, body) => {
                if (err) reject(err);
                else { resolve(body) }
            });
        });
    },

    /**
     * reads a file from the server
     * @param path - path of the file
     * @param encoding - (optional) to read in encoding
     */
    async readFile(path: string, encoding?: 'utf8'): Promise<any> {
        return new Promise((resolve, reject) => {
            let options: fs.WriteFileOptions = {};
            if (encoding) options.encoding = encoding;
            fs.readFile(path, options, (err, data) => {
                if (err) reject(err);
                else { resolve(data) }
            });
        });
    },

    /**
     * deletes the file from the server
     * @param path - path of the file
     */
    async deleteFile(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) reject(err);
                else { resolve(true) }
            });
        });
    },

    randomString() {
        return randomBytes(20).toString('hex');
    },
    generateSearchRegex: (text: string) => {
        let search;
        //SEARCH 
        if (text.charCodeAt(0) >= 20 && text.charCodeAt(0) <= 47) {
            search = new RegExp(`^[${text}]`, 'i')
        }
        else {
            search = new RegExp(`^${text}| ${text}`, 'i');
        }
        console.log("search==>", search);
        return search;
    },
    calculatePaginate: function (params:any) {
        let limit;
        let pageNo;
        //LIMIT FIELD
        if (params.limit) {
            if(typeof(params.limit)=='string')
            {
              limit=parseInt(params.limit);
            }
            else{
                limit =params.limit;
            }

            if (limit > 100) {
                limit = 100;
            }
        }
        else {
            limit = 10;
        }

        //PAGENO
        if (params.pageNo && (params.pageNo !== 0)) {
            pageNo = params.pageNo;
        }
        else {
            pageNo = 1;
        }

        //CALCULATE SKIP..
        let skip = (limit * (pageNo - 1));
        console.log(limit, skip, pageNo);
        return {
            limit,
            pageNo,
            skip
        }
    },
    hashPassword: (password: string): string => {
        // Any random string here (ideally should be atleast 16 bytes)
        const salt = randomBytes(16).toString('hex');
        let hash: string = scryptSync(password, salt, 32).toString('hex'); + salt;
        return hash;
    },
    encryptPassword: (password: string, salt: string) => {
        return scryptSync(password, salt, 32).toString('hex');
    },
    asyncWrapper: async (fn: any) => {
        return function (req: Request, res: Response, next: NextFunction) {
            fn(req, res, next)
                .catch(next)
        }
    }
}