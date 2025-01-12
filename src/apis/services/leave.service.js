const jwt = require('jsonwebtoken')
const moment = require('moment')

const { Token } = require('../models')

const env = require('../../configs/env')
const { tokenTypes } = require('../../configs/tokens')

/**
 * Employee Leave Balance
 * @param {String} employeeId
 * @returns {Promise<Object>}
 */
const getEmployeeLeaveBalanceByEmployeeId = async (employeeId) => {
    const accessTokenExpires = moment().add(env.passport.jwtAccessExpired / 60, 'minutes')
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS)

    const refreshTokenExpires = moment().add(env.passport.jwtRefreshExpired / 60, 'minutes')
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH)
    await calculateLeavesLeft(joiningDate, leavesLeft)
    return {
        leaveLedger: {
            leavesLeft: calculateLeavesLeft.leavesLeft,
            nextRefillDate: calculateLeavesLeft.nextRefillDate,
        },
    }
}

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */

/**
 * Function to calculate leaves left for an employee
 * @param {string} joiningDate - Date of joining in YYYY-MM-DD format
 * @param {number} leavesTaken - Number of leaves taken in the current year
 * @returns {number} - Number of leaves left
 */
const calculateLeavesLeft = async (joiningDate, leavesTaken) => {
    const totalLeavesPerYear = 22
    const today = moment()
    const joiningMoment = moment(joiningDate, 'YYYY-MM-DD')

    if (!joiningMoment.isValid()) {
        throw new Error('Invalid joining date format. Use YYYY-MM-DD.')
    }

    // Calculate next refill date
    const currentYearAnniversary = joiningMoment.clone().year(today.year())
    const nextRefillDate = currentYearAnniversary.isBefore(today)
        ? currentYearAnniversary.add(1, 'year')
        : currentYearAnniversary

    // Leaves left calculation
    const leavesLeft = totalLeavesPerYear - leavesTaken

    if (leavesLeft < 0) {
        throw new Error('Leaves taken cannot exceed total leaves for the year.')
    }

    return {
        leavesLeft,
        nextRefillDate: nextRefillDate.format('YYYY-MM-DD'),
    }
}

module.exports = {
    getEmployeeLeaveBalanceByEmployeeId,
}
