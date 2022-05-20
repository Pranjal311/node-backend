/**
 * @file middlewares
 * @description exposes middleware functions
*/

import { ErrorHandler, InvalidRoute,HeadersValidator } from "./handlers.middleware";

export default {
    ErrorHandler,
    InvalidRoute,
    HeadersValidator
}