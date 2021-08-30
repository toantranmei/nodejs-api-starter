const { join } = require('path')

function getOsEnv(key) {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`)
    }

    return process.env[key]
}

function getOsEnvOptional(key) {
    return process.env[key]
}

function getPath(path) {
    return process.env.NODE_ENV === 'production'
        ? join(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : join(process.cwd(), path)
}

function getPaths(paths) {
    return paths.map((p) => getPath(p))
}

function getOsPath(key) {
    return getPath(getOsEnv(key))
}

function getOsPaths(key) {
    return getPaths(getOsEnvArray(key))
}

function getOsEnvArray(key, delimiter = ',') {
    return (process.env[key] && process.env[key].split(delimiter)) || []
}

function toNumber(value) {
    return parseInt(value, 10)
}

function toBool(value) {
    return value === 'true'
}

function normalizePort(port) {
    const parsedPort = parseInt(port, 10)
    if (isNaN(parsedPort)) {
        // named pipe
        return port
    }
    if (parsedPort >= 0) {
        // port number
        return parsedPort
    }
    return false
}

module.exports = {
    getOsEnv,
    getOsEnvOptional,
    getPath,
    getPaths,
    getOsPath,
    getOsPaths,
    getOsEnvArray,
    toNumber,
    toBool,
    normalizePort,
}
