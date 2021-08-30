const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

module.exports = (app) => {
    // Serve static files like images from the public folder
    app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }))

    // A favicon is a visual cue that client software, like browsers, use to identify a site
    app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
}
