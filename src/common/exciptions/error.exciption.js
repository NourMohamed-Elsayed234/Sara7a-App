

export const ErrorResponse = ({
    status = 400,
    message = "Something went wrong",
    extra = undefined
} = {}) => {
    throw new Error(message, { cause: { status, extra } })
}


// BadRequest Exception (400)
export const BadRequestException = ({ message = "Bad request", extra = undefined } = {}) => {
    return ErrorResponse({ status: 400, message, extra });
};

// NotFound Exception (404)
export const NotFoundException = ({ message = "Not found error", extra = undefined } = {}) => {
    return ErrorResponse({ status: 404, message, extra });
};

// Conflict Exception (409)
export const ConflictException = ({ message = "conflict error", extra = undefined } = {}) => {
    return ErrorResponse({ status: 409, message, extra });
};

// Unauthorized Exception (401)
export const UnauthorizedException = ({ message = "UnAuthorized error", extra = undefined } = {}) => {
    return ErrorResponse({ status: 401, message, extra });
};

// Forbidden Exception (403)
export const ForbiddenException = ({ message = "Forbidden error", extra = undefined } = {}) => {
    return ErrorResponse({ status: 403, message, extra });
};

export const SuccssException = ({ message = "succss", extra = undefined } = {}) => {
    return ErrorResponse({ status: 200, message, extra });
};
