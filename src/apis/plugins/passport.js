const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const env = require('../../configs/env')
const { tokenTypes } = require('../../configs/tokens')

const { User } = require('../models')

const jwtOptions = {
    secretOrKey: env.passport.jwtToken,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type')
        }
        const user = await User.findById(payload.sub)
        if (!user) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy,
}
