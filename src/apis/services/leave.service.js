const jwt = require('jsonwebtoken')
const moment = require('moment')
const { Token } = require('../models')
const env = require('../../configs/env')
const { tokenTypes } = require('../../configs/tokens')
let varEmployeeId = null
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url:
        'https://zhplktaovpyenmypkjql.supabase.co/rest/v1/user?id=eq.' +
        varEmployeeId +
        '&select=leaveEntitlment(user_id,*)&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGxrdGFvdnB5ZW5teXBranFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjUxOTYzMywiZXhwIjoyMDA4MDk1NjMzfQ.i-QsgcR7aZTxpubO0dHGPs-li50B7GrVQKsuW866YLA',
    headers: {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGxrdGFvdnB5ZW5teXBranFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjUxOTYzMywiZXhwIjoyMDA4MDk1NjMzfQ.i-QsgcR7aZTxpubO0dHGPs-li50B7GrVQKsuW866YLA',
    },
}

/**
 * Employee Leave Balance
 * @param {String} employeeId
 * @returns {Promise<Object>}
 */
const getEmployeeLeaveBalanceByEmployeeId = async (employeeId) => {
    /*const accessTokenExpires = moment().add(env.passport.jwtAccessExpired / 60, 'minutes')
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS)
    const refreshTokenExpires = moment().add(env.passport.jwtRefreshExpired / 60, 'minutes')
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH)*/
    varEmployeeId = employeeId
    const response = axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data))
        })
        .catch((error) => {
            console.log(error)
            log.error(error)
        })
    log.info(response)
    await calculateLeavesLeft(response.leaveEntitlment.leaveStartDate, response.leaveEntitlment.leaves_used)
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
