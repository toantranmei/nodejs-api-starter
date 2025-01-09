const httpStatus = require('http-status')
const axios = require('axios')
const ApiError = require('../../utils/api-error')
const { User } = require('../models')
const { supabase } = require('../../configs/env')
const Logger = require('../../libs/logger')
const log = new Logger()
const headers = {
    'Content-Type': 'application/json',
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGxrdGFvdnB5ZW5teXBranFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjUxOTYzMywiZXhwIjoyMDA4MDk1NjMzfQ.i-QsgcR7aZTxpubO0dHGPs-li50B7GrVQKsuW866YLA',
}
const params = {
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGxrdGFvdnB5ZW5teXBranFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjUxOTYzMywiZXhwIjoyMDA4MDk1NjMzfQ.i-QsgcR7aZTxpubO0dHGPs-li50B7GrVQKsuW866YLA',
}
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    return User.create(userBody)
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email, password) => {
    return login(email, password)
    //return User.findOne({ email })
}

function login(email, password) {
    log.info(supabase.loginUrl)
    log.info(email)
    log.info(password)
    const response = axios.post(
        supabase.loginUrl,
        {
            headers: headers,
            params: params,
        },
        {
            email: email,
            password: password,
        }
    )
    log.info(response)
    return response
}
module.exports = {
    createUser,
    getUserByEmail,
}
