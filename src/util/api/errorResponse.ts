import {ErrorResponse} from "../../type/response/ErrorResponseType.js";

export function generateErrorResponse(errorMessage: string): ErrorResponse {
    return {
        success: false,
        error: errorMessage,
    };
}