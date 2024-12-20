const path = require('path')
const winston = require('winston')
const { combine, timestamp, colorize, align, printf, errors, json } = winston.format
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        errors({ stack: true }),
        colorize({ all: true }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({
            filename: 'all.log',
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new winston.transports.Console(),
    ],
})
module.exports = class Logger {
    static DEFAULT_SCOPE = 'app'
    #scope

    constructor(scope) {
        this.#scope = Logger.parsePathToScope(scope ? scope : Logger.DEFAULT_SCOPE)
    }

    static parsePathToScope(filepath) {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '')
            filepath = filepath.replace(`${path.sep}src${path.sep}`, '')
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, '')
            filepath = filepath.replace('.ts', '')
            filepath = filepath.replace('.js', '')
            filepath = filepath.replace(path.sep, ':')
        }
        return filepath
    }

    _formatScope() {
        return `[${this.#scope}]`
    }

    _log(level, message, args) {
        logger.log(level, message)
        if (winston) winston[level](`${this._formatScope()} ${message}`, args)
    }

    debug(message, ...args) {
        logger.log('debug', message)
        this._log('debug', message, args)
    }

    info(message, ...args) {
        logger.log('info', message)
        this._log('info', message, args)
    }

    warn(message, ...args) {
        logger.log('warn', message)
        this._log('warn', message, args)
    }

    error(message, ...args) {
        logger.log('error', message)
        this._log('error', message, args)
    }
}
