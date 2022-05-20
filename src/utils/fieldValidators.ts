

import { Joi } from "celebrate";
import { config } from "../app"


export const FIELD_VALIDATION = {
    EMAIL: {
        "required": Joi
            .string()
            .trim()
            .email()
            .error((errors: any) => {
                errors.forEach((err: any) => {
                    console.log("err===>",err);
                    switch (err.type) {
                        case "string.email":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.email["pattern"];
                            break;
                        case "string.regex.base":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.email["pattern"];
                            break;
                        case "any.empty":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.email["required"];
                            break;
                        case "any.required":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.email["required"];
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
    },
    FIRST_NAME: {
        "required": Joi
            .string()
            .trim()
            .min(2)
            .max(10)
            .required()
            .error((errors: any) => {
                errors.forEach((err: any) => {
                    switch (err.type) {
                        case "string.min":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.firstName["minlength"];
                            break;
                        case "string.max":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.firstName["maxlength"];
                            break;
                        case "string.regex.base":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.firstName["maxlength"];
                            break;
                        case "any.empty":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.firstName["required"];
                            break;
                        case "any.required":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.firstName["required"];
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            })
    },
    PHONE_NO: {
        "optional": Joi
            .string()
            .trim()
            .min(9)
            .max(12)
            .optional()
            .error((errors: any) => {
                errors.forEach((err: any) => {
                    switch (err.type) {
                        case "string.min":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.phoneNo["format"];
                            break;
                        case "string.max":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.phoneNo["format"];
                            break;
                        case "string.regex.base":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.phoneNo["format"];
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            })
    },
    PASSWORD: {
        "required": Joi.string()
            .trim()
            //.regex(config.CONSTANT.REGEX.PASSWORD)
            .min(2)
            .max(20)
            .required().error((errors: any) => {
                errors.forEach((err: any) => {
                    switch (err.type) {
                        case "string.min":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.password["minlength"];
                            break;
                        case "string.max":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.password["maxlength"];
                            break;
                        case "string.empty":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.password["required"];
                            break;
                        case "string.pattern.base":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.password["pattern"];
                            break;
                        case "any.required":
                            err.message = config.CONSTANT.VALIDATION_MESSAGE.password["required"];
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            })
    }
}


