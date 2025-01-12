const httpStatus = require('http-status')
const tokenService = require('./token.service')
const ApiError = require('../../utils/api-error')

/**
 * getEmployeePayslipByMonth
 * @param {string} refreshToken
 * @param {string} employeeId
 * @returns {employeePayslip}
 */
const getEmployeePayslipByMonth = async (refreshToken, employeeId) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken, false)
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    return true
}

module.exports = {
    getEmployeePayslipByMonth,
}
