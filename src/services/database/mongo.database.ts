"use strict";

import mongoose from "mongoose";

import * as config from '../../config/index';

// Connect to MongoDB
export class Database {

	public static async  connectToDb() {
		return new Promise((resolve, reject) => {
			try {

				const dbName = config.SERVER.MONGO.DB_NAME;
				let dbUrl:any = config.SERVER.MONGO.DB_URL;
				
				console.log("Connecting to -> " + dbUrl);
				mongoose.connect(dbUrl).
				then((val)=>{
					mongoose.set('debug', true);
					//console.log("inside then",val);
				    resolve("DB CONNECTED!!");
				})
				.catch((err)=>{
                   throw err;
				});

				// CONNECTION EVENTS
				// When successfully connected
				mongoose.connection.on("connected", function () {
					console.info(`Connected to ${dbUrl}`);
					console.log("Connected to my DB", dbName, "at", dbUrl);
					resolve({});
				});

				// If the connection throws an error
				mongoose.connection.on("error", error => {
					console.log("DB connection error: " + error);
					console.log("DB connection error: " + error);
					reject(error);
				});

				// When the connection is disconnected
				mongoose.connection.on("disconnected", () => {
					console.log("DB connection disconnected.");
					reject("DB connection disconnected.");
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}