

import HTTP from "./code.response";

export const MSG: any = {
    'en-US': {
        NOT_FOUND: 'User not found',
        LOGIN_SUCCESSFULLY: "User created successfully.",
        USER_DETAILS_FETCHED:'User Details Fetched successfully.',
    },

}

export default (lang:any) => ({
    LOGIN_SUCCESSFULLY: { httpCode: HTTP.SUCCESS, statusCode: 200, message: MSG[lang].LOGIN_SUCCESSFULLY },
    USER_DETAILS_FETCHED: { httpCode: HTTP.SUCCESS, statusCode: 200, message: MSG[lang].USER_DETAILS_FETCHED },
    NOT_FOUND:{httpCode: HTTP.NOT_FOUND, statusCode:404, message: MSG[lang].NOT_FOUND}
});


export const CUSTOM_SUCCESS = (data?: any, message?: string) => {
    return ({
        httpCode: 200,
        statusCode: 200,
        message: message ? message : "Success",
        data: data ? data : {}
    })

}

export const CUSTOM_ERROR = (data?: any, message?: string) => {
    return ({
        httpCode: 400,
        statusCode: 400,
        message: message ? message : "Success",
        data: data ? data : {}
    })
}



