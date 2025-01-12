const httpStatus = require('http-status')
const loggers = require('../../libs/logger')
const catchAsync = require('../../utils/catch-async')
const log = new loggers()
const getEmployeeLeaveBalanceByEmployeeId = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).send('OK')
})

module.exports = {
    getEmployeeLeaveBalanceByEmployeeId,
}
