import USER from "./user.response";

export const SUCCESS = {
    DEFAULT: {
        httpCode: 200,
        statusCode: 200,
        message: 'Success'
    }
}

export const CUSTOM_ERROR = (data?: any, message?: string) => {
    return ({
        httpCode: 400,
        statusCode: 400,
        message: message ? message : "Success",
        data: data ? data : {}
    })
}




export const RESPONSE = {
    USER
}


