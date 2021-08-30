const Joi = require('joi')
const httpStatus = require('http-status')

const ApiError = require('../utils/api-error')
const pickKeys = require('../utils/pick-keys')

module.exports = (schema) => (req, res, next) => {
    const validSchema = pickKeys(schema, ['params', 'query', 'body'])
    const object = pickKeys(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object)

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ')
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
    }
    Object.assign(req, value)
    return next()
}
