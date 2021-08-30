const { configure, format, transports } = require('winston')

const env = require('../configs/env')

module.exports = () => {
    configure({
        transports: [
            new transports.Console({
                level: env.log.level,
                handleExceptions: true,
                format:
                    env.node !== 'development'
                        ? format.combine(format.json())
                        : format.combine(format.colorize(), format.simple()),
            }),
        ],
    })
}
