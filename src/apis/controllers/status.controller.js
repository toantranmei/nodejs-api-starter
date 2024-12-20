const httpStatus = require('http-status')
const loggers = require('../../libs/logger')

const catchAsync = require('../../utils/catch-async')
const log = new loggers()
const status = catchAsync(async (req, res) => {
    log.info(req);
    res.status(httpStatus.OK).send("OK")
})

module.exports = {
    status
}

