"use strict";

const SWAGGER_DEFAULT_RESPONSE_MESSAGES = [
	{ code: 200, message: "OK" },
	{ code: 400, message: "Bad Request" },
	{ code: 401, message: "Unauthorized" },
	{ code: 404, message: "Data Not Found" },
	{ code: 500, message: "Internal Server Error" }
];

const HTTP_STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	UPDATED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENY_REQUIRED: 402,
	ACCESS_FORBIDDEN: 403,
	URL_NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	UNREGISTERED: 410,
	PAYLOAD_TOO_LARGE: 413,
	CONCURRENT_LIMITED_EXCEEDED: 429,
	// TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SHUTDOWN: 503,
	// custom
	INVALID_TOKEN: 419,
	SESSION_EXPIRED: 423, // LOGIN_SESSION_EXPIRED
	SOCIAL_ACCOUNT_ALREADY_EXIST: 424
};

const VALIDATION_CRITERIA = {
	PASSWORD_MIN_LENGTH: 3,
	PASSWORD_MAX_LENGTH: 30
};

const MESSAGES = {
	ERROR: {
		UNAUTHORIZED_ACCESS: {
			"statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
			"message": "You are not authorized to perform this action.",
			"type": "UNAUTHORIZED_ACCESS"
		},
		INTERNAL_SERVER_ERROR: {
			"statusCode": HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
			"message": "Please try after some time.",
			"type": "INTERNAL_SERVER_ERROR"
		},
		INVALID_TOKEN: {
			// "statusCode": HTTP_STATUS_CODE.INVALID_TOKEN,
			"statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
			"message": "Token is invalid.",
			"type": "INVALID_TOKEN"
		},
		TOKEN_EXPIRED: {
			"statusCode": HTTP_STATUS_CODE.INVALID_TOKEN,
			"message": "Session has been expired.",
			"type": "TOKEN_EXPIRED"
		},
		TOKEN_GENERATE_ERROR: (error: any) => {
			return {
				"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
				"message": `${error}.`,
				"type": "TOKEN_GENERATE_ERROR"
			};
		},
		EMAIL_ALREADY_VERIFIED: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Email already verified",
			"type": "EMAIL_ALREADY_VERIFIED"
		},
		INVALID_LINK: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Link Expired ",
			"type": "LINK_EXPIRED"
		},
		EMAIL_NOT_REGISTERED: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Please register your email address.",
			"type": "EMAIL_NOT_REGISTERED"
		},
		KINDLY_REGISTER_FIRST: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "In order to proceed kindly register ",
			"type": "KINDLY_REGISTER_FIRST"
		},
		USERNAME_NOT_REGISTERED: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Please register your Username .",
			"type": "EMAIL_NOT_REGISTERED"
		},
		BLOCKED: {
			"statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
			"message": "Your account has been blocked by admin.",
			"type": "USER_BLOCKED"
		},
		EMAIL_NOT_VERIFIED: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Please verify your email address.",
			"type": "EMAIL_NOT_VERIFIED"
		},
		DELETED: {
			statusCode: HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
			"message": "Your account has been deleted by admin.",
			type: "DELETED"
		},
		INCORRECT_PASSWORD: {
			"statusCode": HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
			"message": "Invalid credentials.",
			"type": "INCORRECT_PASSWORD"
		},
		USER_NOT_FOUND: {
			"statusCode": HTTP_STATUS_CODE.UNREGISTERED,
			"message": "User not found.",
			"type": "USER_NOT_FOUND"
		},
		ACCESS_DENIED: {
			"statusCode": HTTP_STATUS_CODE.ACCESS_FORBIDDEN,
			"message": "Access denied.",
			"type": "ACCESS_DENIED"
		},
		INVALID_MOBILE_NUMBER: {
			"statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
			"message": "Please enter valid mobile number.",
			"type": "INVALID_MOBILE_NUMBER"
		},
		BLOCKED_MOBILE: {
			"statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
			"message": "Action blocked for illegal use of services.",
			"type": "BLOCKED_MOBILE"
		},
		SESSION_EXPIRED: {
			"statusCode": HTTP_STATUS_CODE.SESSION_EXPIRED,
			"message": "Your login session has been expired.",
			"type": "SESSION_EXPIRED"
		},
		FIELD_REQUIRED: (value: any) => {
			return {
				"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
				"message": value + " is required.",
				"type": "FIELD_REQUIRED"
			};
		},
		MOBILE_NUMBER_IN_USE: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Mobile Number Already in use by another user.",
			"type": "FIELD_REQUIRED"
		},
		USER_STATUS_UNSUBSCRIBED: {
			"statusCode": HTTP_STATUS_CODE.METHOD_NOT_ALLOWED,
			"message": "Please buy a subscription to proceed.",
			"type": "UNSUBSCRIBED"
		},
		EMAIL_ALREADY_IN_USE: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Email Already in use..",
			"type": "EMAIL_EXISTS"
		},
		CATEGORY_ALREADY_EXISTS: {
			"statusCode": HTTP_STATUS_CODE.BAD_REQUEST,
			"message": "Category with given title already exists."
		},
		REQUEST_UNSIGNED: {
			"statusCode": HTTP_STATUS_CODE.UNAUTHORIZED,
			"message": "Please Sign Your Request.",
		}

	},
	SUCCESS: {
		DEFAULT: {
			"statusCode": HTTP_STATUS_CODE.OK,
			"message": "Success",
			"type": "DEFAULT"
		},
		REFRESH_TOKEN: (data: any) => {
			return {
				"statusCode": HTTP_STATUS_CODE.OK,
				"message": "Token refresh successfully",
				"type": "REFRESH_TOKEN",
				"data": data
			};
		}
	}
};

const MIME_TYPE = {
	XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	CSV1: "application/vnd.ms-excel",
	CSV2: "text/csv",
	XLS: "application/vnd.ms-excel"
};


const REGEX = {
	EMAIL: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/,
	PASSWORD: /(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}/, // Minimum 6 characters, At least 1 lowercase alphabetical character, At least 1 uppercase alphabetical character, At least 1 numeric character, At least one special character
	COUNTRY_CODE: /^\d{1,4}$/,
	MOBILE_NUMBER: /^\d{6,16}$/,
	MONGO_ID: /^[a-f\d]{24}$/i,
	USERNAME: /^[a-zA-Z0-9_@.-]{2,25}$/,
	FIRST_NAME: /^[a-zA-Z]/,
};

const VALIDATION_MESSAGE = {
	email: {
		required: "Please enter email address.",
		pattern: "We do not recognise that Email format.Please try again.",
		maxlength: "Email length must be less than 35 characters "
	},
	password: {
		required: "Please enter Password.",
		pattern: "Password must contain 8-20 characters and at least one upper case letter, one lower case letter, one numeric digit and one special character.",
		minlength: `Please use a password with minimum of 8 characters.`,
		maxlength: `Please use a password with maximum of 20 characters`
	},
	firstName: {
		required: "Please enter First Name.",
		minlength: `Please use a first name with minimum of 2 characters.`,
		maxlength: `Please use a first name with maximum of 10 characters`
	},
	phoneNo:{
		format:'Please enter phone no of length 9-12 with numbers only.'
	}
	
};


export const CONSTANT = {
	SWAGGER_DEFAULT_RESPONSE_MESSAGES: SWAGGER_DEFAULT_RESPONSE_MESSAGES,
	HTTP_STATUS_CODE: HTTP_STATUS_CODE,
	MESSAGES: MESSAGES,
	MIME_TYPE: MIME_TYPE,
	//REGEX: REGEX,
	DEFAULT_PASSWORD: "String@123",
	VALIDATION_MESSAGE: VALIDATION_MESSAGE,
	REGEX,
	VALIDATION_CRITERIA,
};