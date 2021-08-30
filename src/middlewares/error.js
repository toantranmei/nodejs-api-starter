const httpStatus = require('http-status')
const mongoose = require('mongoose')

const ApiError = require('../utils/api-error')
const env = require('../configs/env')
const Logger = require('../libs/logger')

const logger = new Logger(__filename)

const errorConverter = (err, req, res, next) => {
    let error = err

    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message, false, err.stack)
    }
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err

    if (env.isProduction && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    const response = {
        code: statusCode,
        message,
        ...(env.isDevelopment && { stack: err.stack }),
    }

    if (env.isDevelopment) logger.error(err)

    return res.status(statusCode).json(response)
}

module.exports = {
    errorConverter,
    errorHandler,
}
