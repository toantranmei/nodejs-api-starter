const mongoose = require('mongoose')

const env = require('../configs/env')
const Logger = require('../libs/logger')

const log = new Logger(__filename)

module.exports = async () => {
    try {
        await mongoose.connect(env.database.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        log.info('Successfully for MongoDB connected!!')
    } catch (err) {
        log.error(`Failed to connect to MongoDB - ${err.message}`)
        throw new Error(`Failed to connect to MongoDB`)
    }
}
