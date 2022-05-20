"use strict";

import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

export const ENVIRONMENT = process.env.NODE_ENV;

switch (ENVIRONMENT) {
	case "dev":
	case "development": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.development"))) {
			dotenv.config({ path: ".env.development" });
		} else {
			console.log("Unable to find Environment File");
			process.exit(1);
		}
		break;
	}
	case "stag":
	case "staging": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.staging"))) {
			dotenv.config({ path: ".env.staging" });
		} else {
			process.exit(1);
		}
		break;
	}
	case "test":
	case "testing": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.testing"))) {
			dotenv.config({ path: ".env.testing" });
		} else {
			process.exit(1);
		}
		break;
	}
	case "prod":
	case "production": {
		if (fs.existsSync(path.join(process.cwd(), "/.env"))) {
			dotenv.config({ path: ".env" });
		} else {
			process.exit(1);
		}
		break;
	}
	case "default": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.default"))) {
			dotenv.config({ path: ".env.default" });
		} else {
			process.exit(1);
		}
		break;
	}
	case "local": {
		if (fs.existsSync(path.join(process.cwd(), "/.env.local"))) {
			dotenv.config({ path: ".env.local" });
		} else {
			process.exit(1);
		}
		break;
	}
	default: {
		if (fs.existsSync(path.join(process.cwd(), "/.env.local"))) {
			dotenv.config({ path: ".env.local" });
		} else {
			console.log("Unable to find environment file.")
			process.exit(1);
		}
	}
}



export const SERVER = Object.freeze({
	TEMPLATE_PATH: process.cwd() + "/views/",
	UPLOAD_DIR: process.cwd() + "/src/uploads/",
	LOG_DIR: process.cwd() + "/logs",
	// ONE_DAY_TIME_STAMP: 24 * 60 * 60 * 1000, // 1 day
	// LOGIN_TOKEN_EXPIRATION_TIME: "180d", // 180 days
	LOGIN_TOKEN_EXPIRATION_TIME: 180 * 24 * 60 * 60 * 1000, // 180 days
	JWT_CERT_KEY: "g8b9(-=~Sdf)",
	SALT_ROUNDS: 10,
	// for private.key file use RS256, SHA256, RSA
	JWT_ALGO: "HS256", // HS384
	CHUNK_SIZE: 100,
	APP_URL: process.env["APP_URL"],
	ADMIN_URL: process.env["ADMIN_URL"],
	WEB_URL: process.env["WEB_URL"],
	API_BASE_URL: "/rcc/api",
	PATH_TO_FIREBASE_SERVICE_ACCOUNT: process.env["PATH_TO_FIREBASE_SERVICE_ACCOUNT"],
	MONGO: {
		DB_NAME: process.env["DB_NAME"],
		DB_URL: process.env["DB_URL"],
		OPTIONS: {
			user: process.env["DB_USER"],
			pass: process.env["DB_PASSWORD"],
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		// 	// server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
		// 	// replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
		// 	// reconnectTries: 100000,
		// 	// reconnectInterval: 6000
		// },
		// REPLICA: process.env["DB_REPLICA"],
		// REPLICA_OPTION: {
		// 	replicaSet: process.env["DB_REPLICA_SET"],
		// 	authSource: process.env["DB_AUTH_SOURCE"],
		// 	ssl: process.env["DB_SSL"]
		// }
	}
},
	BASIC_AUTH: {
		NAME: "rcc",
		PASS: "rcc@123"
	},
	API_KEY: "1234",
	ENVIRONMENT: process.env["NODE_ENV"],
	IP: process.env["IP"],
	PORT: process.env["PORT"],
	PROTOCOL: process.env["PROTOCOL"],
	TAG: process.env["TAG"],
});
