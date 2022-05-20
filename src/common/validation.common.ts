import { Joi } from "celebrate";

export const VALIDATION = {
    GENERAL: {
        ANY: Joi.any(),
        BOOLEAN: Joi.boolean(),
        STRING: Joi.string(),
        PAGINATION: {
            page: Joi.number().min(1).required(),
            limit: Joi.number().min(3).max(100).default(10).optional(),
            search: Joi.string().trim().optional().allow(''),

        },
        NUMBER: Joi.number(),
    },
    FILTER: {
        //KEY: Joi.array().items(Joi.string().valid(ENUM_ARRAY.FILTERBY.KEYS)),
        FROM_DATE: Joi.date().optional(),
        TO_DATE: Joi.date().optional()
    },
    SORT: {
        //KEY: Joi.string().valid(ENUM_ARRAY.SORT_BY.KEYS),
        SORT_BY: Joi.string().trim().lowercase().optional().default('createdAt'),
        SORT_ORDER: Joi.number().valid(1,-1).default(-1)
    },
    COMMON_HEADERS: {
        "authorization": Joi.string().required().description("Bearer space accessToken :   user"),
        "Content-Type": Joi.string().optional(),
        "Accept-Language": Joi.string().optional().default('en-US'),
        "x-timezone": Joi.string().optional(),
        "x-platform": Joi.number().optional().default(1).description("1 for web").default('1'),
        "x-ip-address": Joi.string().optional(),
        "x-api-key": Joi.string().optional(),
        "Date": Joi.string().optional()

    },
}
