const httpStatus = require('http-status')
const axios = require('axios')
const ApiError = require('../../utils/api-error')
const { User } = require('../models')
const { supabase } = require('../../configs/env')
const Logger = require('../../libs/logger')
const log = new Logger()
let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://zhplktaovpyenmypkjql.supabase.co/auth/v1/token?grant_type=password&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGxrdGFvdnB5ZW5teXBranFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjUxOTYzMywiZXhwIjoyMDA4MDk1NjMzfQ.i-QsgcR7aZTxpubO0dHGPs-li50B7GrVQKsuW866YLA',
    headers: {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGxrdGFvdnB5ZW5teXBranFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MjUxOTYzMywiZXhwIjoyMDA4MDk1NjMzfQ.i-QsgcR7aZTxpubO0dHGPs-li50B7GrVQKsuW866YLA',
    },
    data: null,
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

function login(emailVal, passwordVal) {
    log.info(supabase.loginUrl)
    log.info(emailVal)
    log.info(passwordVal)
    config.data = { email: emailVal, password: passwordVal }
    const response = axios
        .request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data))
        })
        .catch((error) => {
            console.log(error)
            log.error(error)
            log.info(error)
        })
    log.info(response)
    return response
}
module.exports = {
    createUser,
    getUserByEmail,
}
