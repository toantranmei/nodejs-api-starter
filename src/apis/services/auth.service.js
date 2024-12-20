const httpStatus = require('http-status')

const tokenService = require('./token.service')
const userService = require('./user.service')

const ApiError = require('../../utils/api-error')

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }
    return user
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<boolean>}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken, false)
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await refreshTokenDoc.remove()
    return true
}

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
}
