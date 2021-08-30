const path = require('path')
const winston = require('winston')

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
        if (winston) winston[level](`${this._formatScope()} ${message}`, args)
    }

    debug(message, ...args) {
        this._log('debug', message, args)
    }

    info(message, ...args) {
        this._log('info', message, args)
    }

    warn(message, ...args) {
        this._log('warn', message, args)
    }

    error(message, ...args) {
        this._log('error', message, args)
    }
}
